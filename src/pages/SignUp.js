import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../Utils/firebase'
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Bundle
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [idNumber, setIdNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessages, setErrorMessages] = React.useState({});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarOpenn, setSnackbarOpenn] = React.useState(false);
  const [voted] = React.useState(false); // State for voting status
  const [loading, setLoading] = React.useState(false); // State for loading animation

  const navigate = useNavigate();

  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Western Cape',
  ];

  const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
    marginBottom: '-30px'
  };

  const validateDisposableEmail = async (email) => {
    const response = await fetch(`https://disposable.debounce.io/?email=${email}`);
    const data = await response.json();
    return data.disposable === "true";
  };


  const handleSubmit = async () => {
    // event.preventDefault();
    setLoading(true);


    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    

    try {
    const validateForm = async () => {
      const errors = {};
  
      // Perform validation checks here
      if (!name.trim()) {
        errors.name = 'First name is required';
      }
  
      if (!surname.trim()) {
        errors.surname = 'Last name is required';
      }
  
      if (!idNumber.trim()) {
        errors.idNumber = 'ID number is required';
      }
  
      if (!province) {
        errors.province = 'Province is required';
      }
  
      if (!email.trim()) {
        errors.email = 'Email is required. Please enter email.';
      } else if (!isValidEmail(email)) {
        errors.email = 'Invalid Email. Please try again.';
      } else if (await validateDisposableEmail(email)) {
        errors.email = 'Disposable email addresses are not allowed.';
      }
  
      if (!password.trim()) {
        errors.password = 'Password is required. Please enter your password.';
      } else if (password.length < 5) {
        errors.password = 'Password Too Short. Please try Again.';
      }
      setErrorMessages(errors);
      return Object.keys(errors).length === 0;
    };

    if (await validateForm()) {

      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => { const user = userCredentials.user;
          console.log('Registered with:', user.email);
        })

      const user = auth.currentUser;
      const uid = user.uid;

      //const userRef = addDoc(collection(firestore, 'users');
      const userRef = doc(firestore, 'users', uid);
      await setDoc(userRef, {
        name,
        surname,
        province,
        idNumber,
        email,
        voted,
      });

      console.log('User added to Firestore with ID: ', userRef.id);

      await new Promise(resolve => setTimeout(resolve, 3000), setSnackbarOpenn(true));

      navigate('/home');

  } else {
      setSnackbarOpen(true);
      console.log('Form submission failed');
  }

      

    } catch (error) {
      setLoading(false)
      console.error('Error creating account:', error.message);
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="/" sx={{ mt: -10 }}>
            <img src={require('../icons/logo.png')}
              style={logoStyle}
              alt="logo of bundle"
            />
          </Link>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  error={!!errorMessages.name}
                  helperText={errorMessages.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setSurname(e.target.value)}
                  error={!!errorMessages.surname}
                  helperText={errorMessages.surname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="identity"
                  label="ID Number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  error={!!errorMessages.idNumber}
                  helperText={errorMessages.idNumber}
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ minWidth: { xs: '100%', md: 190 } }}>
                  <InputLabel required>Province</InputLabel>
                  <Select
                    required
                    fullWidth
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    error={!!errorMessages.province}
                    helperText={errorMessages.province}
                    label="Province"
                  >
                    <MenuItem value="">
                      <strong>None</strong>
                    </MenuItem>
                    {provinces.map((prov) => (
                      <MenuItem key={prov} value={prov}>
                        {prov}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: '#d32f2f' }}>{errorMessages.province}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errorMessages.email}
                  helperText={errorMessages.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errorMessages.password}
                  helperText={errorMessages.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I would like to receive notifications, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {loading && <LinearProgress />}
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Sign Up
            </Button>
            <Link href="/signin">
              <Button variant="outlined" fullWidth
                sx={{ mb: 2, mt: 1 }}
              >
                Already have an account? Log in</Button>
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Snackbar open={snackbarOpen} autoHideDuration={3500} onClose={() => setSnackbarOpen(false)}>
          <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
            Account not created. Please try again.
          </Alert>
        </Snackbar>
        <Snackbar open={snackbarOpenn} autoHideDuration={6000} onClose={() => setSnackbarOpenn(false)}>
    <Alert onClose={() => setSnackbarOpenn(false)} severity="success" variant='filled' sx={{ width: '100%' }}>
        You have successfully registered your account!
    </Alert>
</Snackbar>
      </Container>
    </ThemeProvider>
  );
}