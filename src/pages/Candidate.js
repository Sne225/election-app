import React, { useState, useEffect } from 'react';
import CandidateCard from '../components/CandidateCard'; // Assuming the component is in the same directory
import { firestore } from '../Utils/firebase';
import SideNav from '../components/SideNav';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Grid, Typography } from '@mui/material';


const Candidate = () => {
  const [candidates, setCandidates] = useState([]);

  const getCandidatesData = async () => {
    try {
      const candidatesCollectionRef = collection(firestore, 'candidates');
      const q = query(candidatesCollectionRef, orderBy('name'));

      const querySnapshot = await getDocs(q);
      const candidatesData = [];

      querySnapshot.forEach((candidateDoc) => {
        const candidateData = candidateDoc.data();
        const candidateId = candidateDoc.id;
        candidatesData.push({ candidateId, ...candidateData });
      });

      setCandidates(candidatesData);
      //setIsLoading(false);
    } catch (error) {
      console.error('Error fetching candidates data:', error);
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    getCandidatesData();
  }, []);

  return (
    <Grid sx={{py: 6, backgroundColor: '#f9f9f9'}}>
    <SideNav />
    <Typography variant="h4" align='center' marginBottom='3%' ><strong>Vote For Your Candidate</strong>
              </Typography>
    <Grid container justifyContent="center" rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
      {candidates.map((candidate, index) => (
        <Grid item key={index}>
          <CandidateCard candidate={candidate} />
        </Grid>
      ))}
    </Grid>
  </Grid>
  );
};

export default Candidate;
