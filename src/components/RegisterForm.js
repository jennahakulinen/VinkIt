// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import {Button, Card, Grid} from '@mui/material';
import {Typography} from '@mui/material';
// import {Button} from '@mui/material';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import {Box} from '@mui/system';
import {AlternateEmail, Badge, Email, Key} from '@mui/icons-material';
import BackButton from './BackButton';

const RegisterForm = ({setToggle}) => {
  const alkuarvot = {
    username: '',
    password: '',
    confirm: '',
    email: '',
    full_name: '',
  };

  const validators = {
    username: ['required', 'minStringLength: 2', 'isAvailable'],
    password: ['required', 'minStringLength: 6'],
    confirm: ['required', 'minStringLength: 6', 'isPasswordMatch'],
    email: ['required', 'isEmail'],
    full_name: ['minStringLength: 2'],
  };

  const errorMessages = {
    username: [
      'This is a required field',
      'Username must be two or more characters',
      'This username is already taken',
    ],
    password: [
      'This is a required field',
      'Passwords must be six or more characters',
    ],
    confirm: ['This is a required field', 'Passwords do not match'],
    email: ['This is a required field', 'Please enter a valid email address'],
    full_name: ['Your name should be two or more characters'],
  };

  const {postUser, getUsername} = useUser();

  const doRegister = async () => {
    console.log('doRegister');
    try {
      delete inputs.confirm;
      const userData = await postUser(inputs);
      userData && setToggle(true);
      console.log(userData);
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    alkuarvot
  );

  useEffect(() => {
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      try {
        return await getUsername(value);
      } catch (err) {
        return true;
      }
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      // sama if lausetta käyttämällä, alla lyhyemmin
      // if (value !== inputs.password) {
      //   return false;
      // }
      // return true;

      return value === inputs.password ? true : false;
    });

    return () => {
      ValidatorForm.removeValidationRule('isAvailable');
    };
  }, [inputs]);

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
          width: '80%',
        }}
      >
        <Grid>
          <Typography
            component="h2"
            variant="fontH2"
            color="primary"
            // padding={2}
            textAlign="center"
            my={3}
          >
            Register here!
          </Typography>
        </Grid>
        <ValidatorForm onSubmit={handleSubmit}>
          <Box className="loginBox">
            <Badge className="icon" />
            <TextValidator
              width="100%"
              variant="standard"
              label="Name"
              placeholder="Enter your name"
              name="full_name"
              onChange={handleInputChange}
              value={inputs.full_name}
              validators={validators.full_name}
              errorMessages={errorMessages.full_name}
            />
          </Box>
          <Box className="loginBox">
            <AlternateEmail className="icon" />
            <TextValidator
              variant="standard"
              placeholder="Choose your username"
              label="New username *"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
              validators={validators.username}
              errorMessages={errorMessages.username}
            />
          </Box>
          <Box className="loginBox">
            <Email className="icon" />
            <TextValidator
              fullWidth
              variant="standard"
              label="Email *"
              placeholder="Enter your email"
              name="email"
              type="email"
              onChange={handleInputChange}
              value={inputs.email}
              validators={validators.email}
              errorMessages={errorMessages.email}
            />
          </Box>
          <Box className="loginBox">
            <Key className="icon" />
            <TextValidator
              fullWidth
              variant="standard"
              label="New password *"
              placeholder="Choose password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={inputs.password}
              validators={validators.password}
              errorMessages={errorMessages.password}
            />
          </Box>
          <Box className="loginBox">
            <Key className="icon" />
            <TextValidator
              fullWidth
              variant="standard"
              label="Repeat password *"
              placeholder="Type password again"
              name="confirm"
              type="password"
              onChange={handleInputChange}
              value={inputs.confirm}
              validators={validators.confirm}
              errorMessages={errorMessages.confirm}
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
              Register
            </Button>
          </Box>
        </ValidatorForm>
      </Card>
    </Grid>
  );
};

RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};

export default RegisterForm;
