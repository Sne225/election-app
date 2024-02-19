import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Utils/firebase';
import { Grid, Typography, Select, MenuItem, FormControl, InputLabel, Card, CardMedia, CardContent, IconButton, AppBar, Toolbar, Box, CircularProgress } from '@mui/material';
import Chart from 'chart.js/auto';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ResultsPublic = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedParty, setSelectedParty] = useState('all');
  const [chart, setChart] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        setLoading(false); // Set loading to false after data is fetched
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
            backgroundColor: [], // Set an array of colors here
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
            data.datasets[0].backgroundColor.push(getRandomColor());
          }
        } else {
          const provinceCounts = {};

          filteredVotesSnapshot.forEach(voteDoc => {
            const { province } = voteDoc.data();
            provinceCounts[province] = (provinceCounts[province] || 0) + 1;
          });

          data.labels = Object.keys(provinceCounts);
          data.datasets[0].data = Object.values(provinceCounts);
          data.datasets[0].backgroundColor = Array(data.labels.length).fill().map(() => {
            return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
          });
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
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
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

  // Function to generate a random color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  return (

    <Grid>
      {loading ? ( // Render loader if loading is true
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          marginTop: 20
        }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Bundle Ballot
                </Typography>
                {/* Add additional items/buttons/icons as needed */}
              </Toolbar>
            </AppBar>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" marginBottom='5px' marginTop='1%'>
                Candidate Results
              </Typography>
              <Typography variant="body2" align="center" marginBottom='20px' >
                Below are the results of the current national ballot for running for present!
              </Typography>
            </Grid>

            {/* Render content once loading is false */}
            <Grid item xs={11.5} md={6}>
              <FormControl fullWidth>
                <InputLabel id="party-select-label" sx={{ marginLeft: '25px' }}>Select Party</InputLabel>
                <Select
                  labelId="party-select-label"
                  id="party-select"
                  value={selectedParty}
                  onChange={handlePartyChange}
                  label="Select Party" // Add this line to explicitly provide the label
                  sx={{ marginLeft: '25px' }}
                >
                  <MenuItem value="all">All</MenuItem>
                  {Array.from(new Set(candidatesData.map(candidate => candidate.party))).map(party => (
                    <MenuItem key={party} value={party}>
                      {party}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {selectedCandidates.map(candidate => (
                  <Card key={candidate.id} sx={{ maxWidth: 350, margin: '0 auto', marginBottom: '20px', }}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={candidate.image}
                      alt={`${candidate.name} ${candidate.surname}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {`${candidate.name} ${candidate.surname}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {expanded ? candidate.manifesto : `${candidate.manifesto.substring(0, 100)}...`}
                      </Typography>
                      <IconButton
                        aria-label="show more"
                        onClick={handleExpandClick}
                        sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', marginLeft: 'auto' }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={11} md={6}>
              <canvas id="votesChart" width="700" height="500"></canvas>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ResultsPublic;
