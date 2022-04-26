import React from 'react';
import {Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useLogin} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';

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
      justifyContent="center"
      alignItems="center"
      marginTop={4}
      spacing={1}
    >
      <Paper>
        <Grid>
          <Typography
            component="h2"
            variant="fontH2"
            padding={2}
            textAlign="center"
          >
            Sign In
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="username"
            placeholder="username"
            name="username"
            onChange={handleInputChange}
            value={inputs.username}
          />
          <TextField
            fullWidth
            label="password"
            placeholder="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <Button fullWidth color="primary" type="submit" variant="contained">
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
    //   <Card>
    //     <Grid
    //       container
    //       justifyContent="center"
    //       alignItems="center"
    //       rowSpacing={1}
    //     >
    //       <Grid item>
    //         <Typography component="h1" variant="h2" gutterBottom>
    //           Login
    //         </Typography>
    //       </Grid>

    //       <Grid item>
    //         <form onSubmit={handleSubmit}>
    //           <TextField
    //             fullWidth
    //             label="username"
    //             placeholder="username"
    //             name="username"
    //             onChange={handleInputChange}
    //             value={inputs.username}
    //           />
    //           <TextField
    //             fullWidth
    //             label="password"
    //             placeholder="password"
    //             name="password"
    //             type="password"
    //             onChange={handleInputChange}
    //             value={inputs.password}
    //           />
    //           <Button fullWidth color="primary" type="submit" variant="contained">
    //             Login
    //           </Button>
    //         </form>
    //       </Grid>
    //     </Grid>
    //   </Card>
  );
};

export default LoginForm;
