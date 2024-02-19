import React, { useState, useEffect } from 'react';
import CandidateCard from '../components/CandidateCard';
import { firestore } from '../Utils/firebase';
import { getAuth } from 'firebase/auth';
import SideNav from '../components/SideNav';
import { collection, getDocs, query, orderBy, doc, updateDoc, increment, getDoc, addDoc } from 'firebase/firestore';
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';


const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const getCandidatesData = async () => {
    try {
      const candidatesCollectionRef = collection(firestore, 'candidates');
      const q = query(candidatesCollectionRef, orderBy('name'));

      const querySnapshot = await getDocs(q);
      const candidatesData = [];

      querySnapshot.forEach((candidateDoc) => {
        const candidateData = candidateDoc.data();
        const candidateId = candidateDoc.id;
        candidatesData.push({ id: candidateId, ...candidateData });
      });

      setCandidates(candidatesData);
    } catch (error) {
      console.error('Error fetching candidates data:', error);
    }
  };

  useEffect(() => {
    // Fetch the current user when the component mounts
    const auth = getAuth();
    setCurrentUser(auth.currentUser);

    // Subscribe to auth state changes to keep currentUser updated
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    // Unsubscribe from auth state changes when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleVote = async () => {
    setOpenDialog(false);
    try {
      if (!selectedCandidate || !currentUser) return;

      // Check if the user has already voted
      const userRef = doc(firestore, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      const alreadyVoted = userDoc.data().voted;

      if (alreadyVoted) {
        // Show a Snackbar indicating that the user has already voted
        setSnackbarMessage('You have already voted!');
        setOpenSnackbar(true);
        return;
      }

      // Add the user's vote to the 'votes' collection
      const voteData = {
        userId: currentUser.uid,
        candidateId: selectedCandidate,
        province: userDoc.data().province,
      };
      await addDoc(collection(firestore, 'votes'), voteData);

      // Mark the user as voted
      await updateDoc(userRef, {
        voted: true
      });

      // Refresh candidate data after voting
      getCandidatesData();

      // Show success message
      setSnackbarMessage('Thank you for voting!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };


  useEffect(() => {
    getCandidatesData();
  }, []);

  return (
    <Grid alignItems="center" justifyContent="center" sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
      <SideNav />
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Typography variant="h4" align="center" marginBottom='3%'>
          <strong>Vote For Your Candidate</strong>
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
          Vote for your preferred candidate by clicking the "Vote" button below their profile.
          You can view their manifesto by clicking the "Show More" button on their profile.
        </Typography>
        <Grid container justifyContent="center" rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
          {candidates.map((candidate) => (
            <Grid item key={candidate.id}>
              <CandidateCard candidate={candidate} onVote={() => {
                setSelectedCandidate(candidate.id);
                setOpenDialog(true);
              }} />
            </Grid>
          ))}
        </Grid>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Vote</DialogTitle>
          <DialogContent>
            Are you sure you want to vote for this candidate?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleVote}>Yes</Button>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2500}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant='filled' sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default Candidate;
