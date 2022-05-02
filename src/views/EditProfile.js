import React, {useContext} from 'react';
import {Button, Card, Grid, Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import {Box} from '@mui/system';
import {useUser} from '../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const EditProfile = () => {
  const {user} = useContext(MediaContext);
  const {deleteUser} = useUser();
  const navigate = useNavigate();

  const doDelete = async () => {
    const ok = confirm('Do you want to delete user?');
    if (ok) {
      try {
        const deleteInfo = await deleteUser(
          user.user_id,
          localStorage.getItem('token')
        );
        if (deleteInfo) {
          navigate('/');
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };

  return (
    <>
      <Grid
        container
        marginTop={10}
        sx={{justifyContent: 'center', alignItems: 'center'}}
      >
        <BackButton />
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="logoFont"
            color="primary"
            padding={2}
            textAlign="center"
            marginBottom={3}
          >
            Edit Profile
          </Typography>
        </Grid>
        <Card sx={{marginBottom: '20px', width: '90%'}}>
          <Box className="loginBox">
            <Button
              onClick={doDelete}
              color="primary"
              type="submit"
              variant="contained"
              size="large"
              sx={{
                fontFamily: ['Fredoka One', 'cursive'].join(','),
                fontSize: '24px',
              }}
            >
              Delete user
            </Button>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default EditProfile;
