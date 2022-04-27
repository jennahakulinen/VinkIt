import React from 'react';
import {Box, Button, Card, Grid, TextField, Typography} from '@mui/material';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useLogin} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import {AlternateEmail, Key} from '@mui/icons-material';

const LoginForm = () => {
  // eslint-disable-next-line no-unused-vars
  const {user, setUser} = useContext(MediaContext);
  const alkuarvot = {
    username: '',
    password: '',
  };

  const {postLogin} = useLogin();
  const navigate = useNavigate();

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
  return (
    <Grid
      container
      marginTop={20}
      sx={{justifyContent: 'center', alignItems: 'center'}}
    >
      <Card
        sx={{
          width: '80%',
        }}
      >
        <Grid>
          <Typography
            component="h2"
            variant="fontH2"
            padding={2}
            textAlign="center"
            marginBottom={3}
          >
            Sign In
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Box className="loginBox">
            <AlternateEmail sx={{fontSize: '2rem', mr: 1, my: 0.5}} />
            <TextField
              fullWidth
              label="Username"
              variant="standard"
              placeholder="Tell me your username"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
            />
          </Box>
          <Box className="loginBox">
            <Key sx={{fontSize: '2rem', mr: 1, my: 0.5}} />
            <TextField
              variant="standard"
              fullWidth
              label="Password"
              placeholder="Shh..."
              name="password"
              type="password"
              onChange={handleInputChange}
              value={inputs.password}
            />
          </Box>
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
            >
              Login
            </Button>
          </Box>
        </form>
      </Card>
    </Grid>
  );
};

export default LoginForm;
