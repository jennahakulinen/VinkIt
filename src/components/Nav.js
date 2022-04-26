import React, {useRef} from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';
import {Home, AccountCircle, CloudUpload, Favorite} from '@mui/icons-material';

const Nav = () => {
  const {user, setUser} = useContext(MediaContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const {getUser} = useUser();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await getUser(localStorage.getItem('token'));
      console.log(userData);
      setUser(userData);
    } catch (err) {
      setUser(null);
      navigate('/home');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user, open);

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              MyApp
            </Typography>
            <Button
              component={Link}
              to={user ? '/logout' : '/'}
              color="inherit"
            >
              {user ? 'Logout' : 'Login'}
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          onClose={() => {
            setOpen(!open);
          }}
        >
          <List
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            {user && (
              <>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <CloudUpload />
                  </ListItemIcon>
                  <ListItemText primary="Upload" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <Favorite />
                  </ListItemIcon>
                  <ListItemText primary="My Favorites" />
                </ListItemButton>
              </>
            )}
          </List>
        </Drawer>
      </Box>

      <Box sx={{width: '100%', pb: 7}} ref={ref}>
        <Paper
          sx={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200}}
          elevation={3}
        >
          {user ? (
            <>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction
                  component={Link}
                  to="/home"
                  label="Home"
                  icon={<HomeIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to="/upload"
                  label="Add"
                  icon={<AddCircleIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to="/myfavorites"
                  label="Favorites"
                  icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to="/profile"
                  label="Profile"
                  icon={<PersonIcon />}
                />
              </BottomNavigation>
            </>
          ) : (
            <>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction
                  component={Link}
                  to="/home"
                  label="Home"
                  icon={<HomeIcon />}
                >
                  <Home />
                </BottomNavigationAction>
                <BottomNavigationAction
                  component={Link}
                  to={!user && '/'}
                  label="Log in"
                  color="inherit"
                  icon={<PersonIcon />}
                />
              </BottomNavigation>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default Nav;
