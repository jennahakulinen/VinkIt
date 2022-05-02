import React from 'react';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Typography,
  Grid,
  List,
} from '@mui/material';

import MediaTable from '../components/MediaTable';
import {Link} from 'react-router-dom';
import Nav from '../components/Nav';
import {Box} from '@mui/system';

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
      {user && (
        <>
          <Card
            sx={{
              borderRadius: 0,
              position: 'relative',
              boxShadow: 'none',
              height: '100vh',
              paddingBottom: '12%',
            }}
          >
            <CardContent sx={{padding: 0}}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 2,
                  marginTop: 0.5,
                }}
              >
                <Typography variant="fontH1" color="primary">
                  Vink it!
                </Typography>

                <Button
                  component={Link}
                  to={user ? '/logout' : '/'}
                  color="inherit"
                >
                  {user && 'Logout'}
                </Button>
              </Box>
              <Box
                sx={{
                  bgcolor: '#76CFDB',
                }}
              >
                <Grid container>
                  <Grid item xs={5}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={avatar.filename}
                          imgProps={{
                            alt: `${user.username}'s profile image`,
                          }}
                          sx={{width: 200, height: 200}}
                        />
                      </ListItemAvatar>
                    </ListItem>
                  </Grid>
                  <Grid item xs={7}>
                    <List
                      sx={{
                        paddingTop: 4,
                        color: '#ffffff',
                        paddingLeft: 5,
                      }}
                    >
                      <ListItem>
                        <ListItemText primary={user.username} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={user.email} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={user.full_name} />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <MediaTable allFiles={false} />
          </Card>
        </>
      )}
    </>
  );
};

export default Profile;
