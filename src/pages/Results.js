import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Utils/firebase';
import { Grid, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import SideNav from '../components/SideNav';
import Chart from 'chart.js/auto';

const Results = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedParty, setSelectedParty] = useState('all');
  const [chart, setChart] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidatesCollectionRef = collection(firestore, 'candidates');
        const candidatesSnapshot = await getDocs(candidatesCollectionRef);
        const candidates = [];

        for (const candidateDoc of candidatesSnapshot.docs) {
          const candidateData = candidateDoc.data();
          const candidateId = candidateDoc.id;
          candidates.push({ id: candidateId, ...candidateData });
        }

        setCandidatesData(candidates);
      } catch (error) {
        console.error('Error fetching candidates data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
        try {
          let filteredVotesQuery;
          if (selectedParty === 'all') {
            // Query all votes
            filteredVotesQuery = collection(firestore, 'votes');
          } else {
            // Query votes for the selected party
            const partyCandidates = candidatesData.filter(candidate => candidate.party === selectedParty);
            const partyCandidateIds = partyCandidates.map(candidate => candidate.id);
            filteredVotesQuery = query(collection(firestore, 'votes'), where('candidateId', 'in', partyCandidateIds));
          }
      
          const filteredVotesSnapshot = await getDocs(filteredVotesQuery);
      
          const data = {
            labels: [],
            datasets: [{
              label: 'Count',
              data: [],
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1
            }]
          };
      
          if (selectedParty === 'all') {
            const partyCounts = {};
      
            filteredVotesSnapshot.forEach(voteDoc => {
              const { candidateId } = voteDoc.data();
              if (!partyCounts[candidateId]) {
                partyCounts[candidateId] = 0;
              }
              partyCounts[candidateId]++;
            });
      
            for (const candidate of candidatesData) {
              data.labels.push(`${candidate.name} ${candidate.surname}`);
              data.datasets[0].data.push(partyCounts[candidate.id] || 0);
            }
          } else {
            const provinceCounts = {};
      
            filteredVotesSnapshot.forEach(voteDoc => {
              const { province } = voteDoc.data();
              provinceCounts[province] = (provinceCounts[province] || 0) + 1;
            });
      
            data.labels = Object.keys(provinceCounts);
            data.datasets[0].data = Object.values(provinceCounts);
          }
      
          // Clear existing chart
          if (chart) {
            chart.destroy();
          }
      
          // Create new chart
          const ctx = document.getElementById('votesChart').getContext('2d');
          const newChart = new Chart(ctx, {
            type: 'bar',
            data,
            options: {
              scales: {
                x: {
                  beginAtZero: true
                },
                y: {
                  beginAtZero: true
                }
              }
            }
          });
      
          setChart(newChart);
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };
      

    fetchChartData();
  }, [selectedParty, candidatesData]);

  const handlePartyChange = (event) => {
    setSelectedParty(event.target.value);
  };

  useEffect(() => {
    if (selectedParty !== 'all') {
      const partyCandidates = candidatesData.filter(candidate => candidate.party === selectedParty);
      setSelectedCandidates(partyCandidates);
    } else {
      setSelectedCandidates([]);
    }
  }, [selectedParty, candidatesData]);

  return (
    <Grid container spacing={2}>
      <SideNav />
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Results
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="party-select-label">Select Party</InputLabel>
          <Select
            labelId="party-select-label"
            id="party-select"
            value={selectedParty}
            onChange={handlePartyChange}
          >
            <MenuItem value="all">All</MenuItem>
            {Array.from(new Set(candidatesData.map(candidate => candidate.party))).map(party => (
              <MenuItem key={party} value={party}>
                {party}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <canvas id="votesChart" width="400" height="400"></canvas>
      </Grid>
      <Grid item xs={12}>
        {selectedCandidates.map(candidate => (
          <div key={candidate.id}>
            <Typography variant="h6">
              {`${candidate.name} ${candidate.surname}`}
            </Typography>
            <img src={candidate.pictureUrl} alt={`${candidate.name} ${candidate.surname}`} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default Results;
