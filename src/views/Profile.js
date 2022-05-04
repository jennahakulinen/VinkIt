import React from 'react';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import {
  Avatar,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  List,
} from '@mui/material';

import MediaTable from '../components/MediaTable';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';

const Profile = () => {
  const {user} = useContext(MediaContext);
  const [avatar, setAvatar] = useState({});
  const {getTag} = useTag();

  const fetchAvatar = async () => {
    if (user) {
      const avatars = await getTag('avatar_' + user.user_id);
      const ava = avatars.pop();
      ava.filename = mediaUrl + ava.filename;
      setAvatar(ava);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [user]);

  return (
    <>
      <Nav />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          paddingTop: 2.5,
        }}
      >
        <Typography variant="fontH1" color="primary">
          Vink it!
        </Typography>
        <Button
          component={Link}
          to={user ? '/logout' : '/'}
          sx={{
            background: 'none',
            color: '#05192c',
            fontSize: '16px',
            fontWeight: '900',
          }}
        >
          {user && 'Log out'}
        </Button>
      </Box>
      {user && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#76CFDB',
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '1rem',
              }}
            >
              <Box sx={{px: '0.9rem', py: '0.9rem'}}>
                <Avatar
                  src={avatar.filename}
                  imgProps={{
                    alt: `${user.username}'s profile image`,
                  }}
                  sx={{width: 150, height: 150, border: '2px solid #f7f7f7'}}
                />
              </Box>
              <Box
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <List>
                  <ListItem className="profileItem">
                    <ListItemText
                      className="profileItemText"
                      sx={{padding: 0}}
                      primary={user.username}
                      primaryTypographyProps={{
                        fontFamily: ['Fredoka One', 'cursive'].join(','),
                        fontSize: '32px',
                        color: '#F7F7F7',
                        textAlign: 'center',
                      }}
                    />
                  </ListItem>
                  <ListItem className="profileItem">
                    <ListItemText
                      className="profileItemText"
                      primary={user.full_name}
                      primaryTypographyProps={{
                        fontFamily: ['Lato', 'sans-serif'].join(','),
                        fontSize: '16px',
                        fontWeight: '700',
                        textAlign: 'center',
                      }}
                    />
                  </ListItem>
                  <ListItem className="profileItem">
                    <ListItemText
                      className="profileItemText"
                      primary={user.email}
                      primaryTypographyProps={{
                        fontFamily: ['Lato', 'sans-serif'].join(','),
                        fontSize: '12px',
                        fontWeight: '400',
                        textAlign: 'center',
                      }}
                    />
                  </ListItem>
                </List>
                <Box sx={{textAlign: 'center', marginTop: '5px'}}>
                  <Button
                    component={Link}
                    to={'/editprofile'}
                    color="primary"
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                      fontFamily: ['Fredoka One', 'cursive'].join(','),
                      fontSize: '16px',
                    }}
                  >
                    Edit profile
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <MediaTable allFiles={false} />
        </>
      )}
    </>
  );
};

export default Profile;
