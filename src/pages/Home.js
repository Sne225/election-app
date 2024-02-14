import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Tooltip,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Lottie from 'react-lottie';
import animationData from '../animations/anim.json';
import CustomCard from '../components/CustomCard';
import SideNav from '../components/SideNav';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Update primary color to a shade of blue
    },
    secondary: {
      main: '#FF5722', // Update secondary color to a shade of orange
    },
  },
  typography: {
    fontFamily: ['Helvetica', 'sans-serif'].join(','), // Use Roboto as the default font
  },
});

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData, // Your imported Lottie animation JSON file
  
};

export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ py: 6, backgroundColor: '#f4f4f4'}}>
      {/* <AppBar position="static" sx={{ backgroundColor: "#2196F3", color: "white" }}>
          <Toolbar>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Bundle Ballot System</Link>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={{ minWidth: 100, cursor: 'pointer' }}>Home</Typography>
              </Link>
              <Link to="/elections" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={{ minWidth: 100, cursor: 'pointer' }}>Elections</Typography>
              </Link>
              <Link to="/candidates" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={{ minWidth: 100, cursor: 'pointer' }}>Candidates</Typography>
              </Link>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar> */}

        
        <SideNav />
        <Container sx={{ py: 6}}>
              <Grid container spacing={4} sx={{fontFamily: 'Roboto'}}>
            <Grid item xs={12} align={'center'}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: -14,  marginBottom: -5 }}>
            <Lottie
        options={lottieOptions} // Adjust speed here
        speed={0.9}
        height={250}
        width={250}
      />
            </Box>
              <Typography variant="h4" gutterBottom>
                <strong>Welcome to Bundle Ballot System</strong>
              </Typography>
              <Typography variant="body1" sx={{marginBottom: 2}}>
              Bundle is your go-to platform for managing elections seamlessly. Whether it's for your school, organization, or community, Bundle has got you covered.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{marginBottom: 1, align: 'center'}}>
                <strong>Ongoing Elections</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarTodayIcon />
                      <div>
                        <Typography variant="h6"><strong>National Council President</strong></Typography>
                        <Typography variant="body2">Election for the council president for the academic year 2024-25.</Typography>
                        <Typography variant="caption">Feb 15, 2024 - March 17, 2024</Typography>
                      </div>
                      <Button size="small" component={Link} to="/election-details">View</Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarTodayIcon />
                      <div>
                        <Typography variant="h6"><strong>Ward Councillor</strong></Typography>
                        <Typography variant="body2">Election for the Ward Counciller for the each city. Nearest station. </Typography>
                        <Typography variant="caption">Jan 15, 2024 - March 30, 2024</Typography>
                      </div>
                      <Button size="small" component={Link} to="/election-details">View</Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{marginBottom: 1}}>
                <strong>Upcoming Elections</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarTodayIcon />
                      <div>
                        <Typography variant="h6"><strong>Provincial Association President</strong></Typography>
                        <Typography variant="body2">Election for the president of the Provincial Association.</Typography>
                        <Typography variant="caption">Jan 15, 2024 - March 30, 2024</Typography>
                      </div>
                      <Button sx={{ ml: 'auto' }} size="large" component={Link} to="#">
                        View
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonAddIcon fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
    </div>
  );
}
