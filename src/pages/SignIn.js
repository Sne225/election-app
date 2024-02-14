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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import FormHelperText from '@mui/material/FormHelperText';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alert from '@mui/material/Alert';


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

export default function SignIn() {

const [showPassword, setShowPassword] = React.useState(false);
const [errorMessages, setErrorMessages] = React.useState({});
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [snackbarOpenn, setSnackbarOpenn] = React.useState(false);


const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
        errors.email = 'Email is required. Please enter email.';
    } else if (!isValidEmail(email)) {
        errors.email = 'Invalid Email. Please try again.';
    }
    

    if (!password.trim()) {
        errors.password = 'Password is required. Please enter your password.';
    } else if (password.length < 5) {
        errors.password = 'Password Too Short. Please try Again.';
    }
    
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
};

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
        console.log('Form submitted successfully');
        // Add your form submission logic here
    } else {
        console.log('Form submission failed');
    }

    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
    marginBottom: '-30px'
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
          <Link href="/">
          <img src={require('../icons/logo.png')}
                style={logoStyle}
                alt="logo of bundle"
              />
            </Link>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
                  error={!!errorMessages.email}
                  helperText={errorMessages.email}
            />
            
             <FormControl sx={{ minWidth: { xs: '100%', md: 400} }}>
             <InputLabel htmlFor="filled-adornment-password" required>Password</InputLabel>
            <OutlinedInput
            fullWidth
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
                  error={!!errorMessages.password}
                 
          />
          <FormHelperText sx={{color: '#d32f2f'}}>{errorMessages.password}</FormHelperText>
          </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Link href="/signup">
            <Button variant="outlined" fullWidth
           sx={{ mb: 2}}
            >
                Don't have an account? Sign Up</Button>
            </Link> 
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar open={snackbarOpenn} autoHideDuration={6000} onClose={() => setSnackbarOpenn(false)}>
    <Alert onClose={() => setSnackbarOpenn(false)} severity="success" variant='filled' sx={{ width: '100%' }}>
        You have successfully registered your account!
    </Alert>
</Snackbar>
      </Container>
    </ThemeProvider>
  );
}