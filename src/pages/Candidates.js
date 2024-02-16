import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../Utils/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const candidatesSnapshot = await firestore.collection('candidates').get();
                const candidatesData = candidatesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCandidates(candidatesData);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, []);

    const handleVote = async (candidateId) => {
        try {
            if (!user) {
                alert('Please log in to vote.');
                return;
            }
    
            const userDocRef = doc(firestore, 'users', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
    
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                if (!userData.voted) {
                    // Update user's voted status
                    await updateDoc(userDocRef, { voted: true });
    
                    // Increment candidate's vote count
                    const candidateDocRef = doc(firestore, 'candidates', candidateId);
                    await updateDoc(candidateDocRef, { votes: firestore.FieldValue.increment(1) });
    
                    alert('Vote recorded successfully!');
                } else {
                    alert('You have already voted.');
                }
            } else {
                console.error('User document does not exist in Firestore.');
            }
        } catch (error) {
            console.error('Error handling vote:', error);
        }
    };    

    return (
        <div>
            {candidates.map((candidate) => (
                <Card key={candidate.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {candidate.name}
                        </Typography>
                        <Typography color="text.secondary">
                            {candidate.party}
                        </Typography>
                        <Button
                            variant="contained"
                            disabled={!user || user.voted}
                            onClick={() => handleVote(candidate.id)}
                        >
                            Vote
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Candidates;
