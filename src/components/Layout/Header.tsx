// src/components/Layout/Header.tsx
import React from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem,
    Avatar, CircularProgress, Tooltip, useTheme
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircle from '@mui/icons-material/AccountCircle';
// Note: Removed dark mode icons and context as per previous iterations/comments in the original code

import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const theme = useTheme(); // Get theme for accessing palette values like gradient
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    auth.logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={1} // Using elevation 1 as specified
      sx={{
        // Apply gradient background if defined in theme, otherwise use primary color
        background: theme.palette.gradient || theme.palette.primary.main,
        // Or just ensure primary color if gradient isn't always desired:
        // bgcolor: 'primary.main',
      }}
    >
      <Toolbar>
        {/* Logo/Icon */}
        <SecurityIcon sx={{ mr: 1, color: 'inherit' }} />

        {/* App Title - Links to Home */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color: 'inherit', // Inherit color (usually contrastText)
            textDecoration: 'none',
            fontWeight: 'bold',
            flexGrow: 1, // Pushes subsequent items to the right
            '&:hover': { // Optional: subtle hover effect on title
              opacity: 0.9
            }
          }}
        >
          Safety Companion
        </Typography>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/map">Map</Button>
            <Button color="inherit" component={RouterLink} to="/alerts">Alerts</Button>
            <Button color="inherit" component={RouterLink} to="/tips">Tips</Button>
            <Button color="inherit" component={RouterLink} to="/faq">FAQ</Button>
            <Button color="inherit" component={RouterLink} to="/resources">Resources</Button> {/* Added Resource Link */}
        </Box>

        {/* Theme Toggle Button Removed */}

        {/* Authentication Section */}
        <Box sx={{ ml: 2 }}> {/* Margin left to space from nav links */}
          {auth.loading ? (
            <CircularProgress color="inherit" size={24} />
          ) : auth.isAuthenticated ? (
            /* Logged In State */
            <div>
              <Tooltip title="Account options">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {/* Display first initial or fallback icon */}
                    {auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : <AccountCircle />}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Anchor below button
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                // Optional: Improve menu appearance
                PaperProps={{
                  elevation: 3, // Slightly more shadow for menu
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))', // Softer shadow
                    mt: 1.5, // Margin top
                    minWidth: 150, // Give menu some width
                    '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
                    '&::before': { // Arrow pointer (cosmetic)
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
              >
                {/* Future: Add Profile link */}
                {/* <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            /* Logged Out State */
            <Button color="inherit" component={RouterLink} to="/login"> Login </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;