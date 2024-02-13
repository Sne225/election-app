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
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

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
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#2196F3", color: "white" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bundle
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer', mr: 3 }}>Home</Typography>
            <Typography variant="body1" sx={{ cursor: 'pointer', mr: 3 }}>Elections</Typography>
            <Typography variant="body1" sx={{ cursor: 'pointer', mr: 3 }}>Candidates</Typography>
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
      </AppBar>
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} align={'center'}>
            <Typography variant="h4" gutterBottom>
              Welcome to Bundle
            </Typography>
            <Typography variant="body1" gutterBottom>
              Bundle is your go-to platform for managing elections seamlessly. Whether it's for your school, organization, or community, Bundle has got you covered.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Ongoing Elections
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarTodayIcon />
                    <div>
                      <Typography variant="h6">Municipal Council President</Typography>
                      <Typography variant="body2">Election for the council president for the academic year 2023-24.</Typography>
                      <Typography variant="caption">March 15, 2023 - March 17, 2023</Typography>
                    </div>
                    <Button size="small">View</Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarTodayIcon />
                    <div>
                      <Typography variant="h6">Student Council President</Typography>
                      <Typography variant="body2">Election for the student council president for the academic year 2023-24.</Typography>
                      <Typography variant="caption">March 15, 2023 - March 17, 2023</Typography>
                    </div>
                    <Button size="small">View</Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Upcoming Elections
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarTodayIcon />
                    <div>
                      <Typography variant="h6">Parent-Teacher Association President</Typography>
                      <Typography variant="body2">Election for the president of the Parent-Teacher Association.</Typography>
                    </div>
                    <Button sx={{ ml: 'auto' }} size="large">
                      Vote Now
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