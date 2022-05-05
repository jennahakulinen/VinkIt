import React, {useRef} from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import {useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';

const Nav = () => {
  const {user, setUser} = useContext(MediaContext);
  const ref = useRef(null);
  const {getUser} = useUser();
  const navigate = useNavigate();

  const getPageIndex = (route) => {
    switch (route) {
      case '/~jennash/MPJKK/Project/':
        return 0;
      case '/~jennash/MPJKK/Project/login':
        return 1;
      case '/~jennash/MPJKK/Project/upload':
        return 1;
      case '/~jennash/MPJKK/Project/myfavorites':
        return 2;
      case '/~jennash/MPJKK/Project/profile':
        return 3;
      default:
        return 0;
    }
  };

  const value = getPageIndex(window.location.pathname);

  const fetchUser = async () => {
    try {
      const userData = await getUser(localStorage.getItem('token'));
      setUser(userData);
    } catch (err) {
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box sx={{width: '100%'}} ref={ref}>
      <Paper
        sx={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200}}
        elevation={3}
      >
        {user ? (
          <BottomNavigation
            sx={{backgroundColor: '#76CFDB'}}
            showLabels
            value={value}
          >
            <BottomNavigationAction
              sx={{
                color: '#F7F7F7',
              }}
              component={Link}
              to="/"
              label="Home"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              sx={{
                color: '#F7F7F7',
              }}
              component={Link}
              to="/upload"
              label="Add"
              icon={<AddCircleIcon />}
            />
            <BottomNavigationAction
              sx={{
                color: '#F7F7F7',
              }}
              component={Link}
              to="/myfavorites"
              label="Favorites"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
              sx={{
                color: '#F7F7F7',
              }}
              component={Link}
              to="/profile"
              label="Profile"
              icon={<PersonIcon />}
            />
          </BottomNavigation>
        ) : (
          <BottomNavigation
            sx={{backgroundColor: '#76CFDB'}}
            showLabels
            value={value}
          >
            <BottomNavigationAction
              sx={{
                color: '#F7F7F7',
              }}
              component={Link}
              to="/"
              label="Home"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              sx={{
                color: '#F7F7F7',
              }}
              component={Link}
              to={!user && '/login'}
              label="Log in"
              color="inherit"
              icon={<PersonIcon />}
            />
          </BottomNavigation>
        )}
      </Paper>
    </Box>
  );
};

export default Nav;
