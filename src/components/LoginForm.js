import React from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useLogin, useMedia} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import {AlternateEmail, Key} from '@mui/icons-material';
import BackButton from './BackButton';

const LoginForm = () => {
  // eslint-disable-next-line no-unused-vars
  const {user, setUser} = useContext(MediaContext);
  const alkuarvot = {
    username: '',
    password: '',
  };

  const {postLogin} = useLogin();
  const navigate = useNavigate();
  const {loading} = useMedia();

  const doLogin = async () => {
    console.log('doLogin');
    try {
      const userData = await postLogin(inputs);
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, alkuarvot);
  console.log(inputs);

  // useEffect(() => {
  //   if (inputs.user) {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //       setPreview(reader.result);
  //     });
  //     reader.readAsDataURL(inputs.user);
  //   }
  // }, [inputs.user]);
  return (
    <Grid
      container
      marginTop={10}
      sx={{justifyContent: 'center', alignItems: 'center'}}
    >
      <BackButton />
      <Grid>
        <Typography
          component="h1"
          variant="logoFont"
          color="primary"
          padding={2}
          textAlign="center"
          marginBottom={3}
        >
          Vink It!
        </Typography>
      </Grid>
      <Card
        sx={{
          width: '90%',
        }}
      >
        <Grid>
          <Typography
            component="h2"
            variant="fontH2"
            color="primary"
            padding={2}
            textAlign="center"
            my={1}
          >
            Login
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Box className="loginBox">
            <AlternateEmail className="icon" />
            <TextField
              fullWidth
              label="Username"
              variant="standard"
              placeholder="Enter your username"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
            />
          </Box>
          <Box className="loginBox">
            <Key className="icon" />
            <TextField
              variant="standard"
              fullWidth
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={inputs.password}
            />
          </Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box className="loginBox">
              <Button
                color="primary"
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  fontFamily: ['Fredoka One', 'cursive'].join(','),
                  fontSize: '24px',
                }}
                // disabled={!inputs.user}
              >
                Log In
              </Button>
            </Box>
          )}
        </form>
      </Card>
    </Grid>
  );
};

export default LoginForm;
