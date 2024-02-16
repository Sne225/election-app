// src/components/SideNavigation.js
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert,
    Box, Avatar, Tooltip, Link, Menu, MenuItem
} from '@mui/material';
import { FaHome, FaUsers, FaBell, FaChartBar, FaCog, FaBars, FaTimes, FaUserEdit, FaSignOutAlt, FaCodeBranch } from 'react-icons/fa';
import Profile from './Profile';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Utils/firebase';
import logo from '../icons/logo.png';
import '../App.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';




const navItems = [
    { label: 'Home', icon: <FaHome color='white' />, path: '/home' },
    { label: 'Candidates', icon: <FaUsers color='white' />, path: '/candidates' },
    { label: 'Vote', icon: <FaCodeBranch color='white' />, path: '#' },
    { label: 'Notifications', icon: <FaBell color='white' />, path: '#' },
    { label: 'Results', icon: <FaChartBar color='white' />, path: '#' },
];

const SideNav = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const toggleSideNav = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        const handleScrollToElement = () => {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        handleScrollToElement();
    }, [location.hash]);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        // Close the snackbar after a delay (e.g., 2 seconds)
        let timer;
        if (snackbarOpen) {
            timer = setTimeout(() => setSnackbarOpen(false), 2000);
        }

        return () => clearTimeout(timer); // Cleanup the timer on component unmount

    }, [snackbarOpen]);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            // Show success snackbar
            setSnackbarOpen(true);
            // Close the dialog after a delay (e.g., 2 seconds)
            setTimeout(() => setLogoutDialogOpen(false), 2000);
            // Redirect to the home page after signing out after the delay
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };



    return (
        <div>

            <AppBar position="fixed" className="app-bar">
                {/* <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSideNav}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </IconButton>
                    <Profile />
                </Toolbar> */}

                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSideNav}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </IconButton>
                    <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Bundle Ballot</Link>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                              <Profile />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={isOpen} onClose={toggleSideNav}>
                <div className="drawer-content">

                    <div class="image-container">
                        <img src={logo} alt="Logo" class="logo" />
                    </div>


                    <Divider />
                    <List>
                        {navItems.map((item) => (
                            <ListItem
                                key={item.label}
                                button
                                component={RouterLink}
                                to={item.path}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <ListItemIcon className="icon">{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => setLogoutDialogOpen(true)}>
                            <ListItemIcon className="icon">
                                <FaSignOutAlt color='white' />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>

            {/* Logout Confirmation Dialog */}
            <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    Are you sure you want to logout?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSignOut} color="error">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Logout Success */}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" variant='filled' sx={{ width: '100%' }}>
                    Logout successful!
                </Alert>
            </Snackbar>


            {/* Add content container to prevent content from being hidden behind the app bar */}
            <div className="content-container">
                {/* Your main content goes here */}
            </div>
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
          <Avatar fontSize="small" />My account
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
};

export default SideNav;