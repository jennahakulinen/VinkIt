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

const RegisterForm = ({setToggle}) => {
  const alkuarvot = {
    username: '',
    password: '',
    confirm: '',
    email: '',
    full_name: '',
  };

  const validators = {
    username: ['required', 'minStringLength: 3', 'isAvailable'],
    password: ['required', 'minStringLength: 5'],
    confirm: ['required', 'isPasswordMatch'],
    email: ['required', 'isEmail'],
    full_name: ['minStringLength: 2'],
  };

  const errorMessages = {
    username: [
      'required field',
      'minimum 3 characters',
      'username not available',
    ],
    password: ['required field', 'Minimum 5 characters'],
    confirm: ['required field', 'Passwords do not match'],
    email: ['required field', 'Email is not valid'],
    full_name: ['Minimum 2 characters'],
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
            Register here!
          </Typography>
        </Grid>
        <ValidatorForm onSubmit={handleSubmit}>
          <Box className="loginBox">
            <AlternateEmail sx={{fontSize: '2rem', mr: 1, my: 0.5}} />
            <TextValidator
              variant="standard"
              placeholder="Choose your username"
              label="New username"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
              validators={validators.username}
              errorMessages={errorMessages.username}
            />
          </Box>
          <Box className="loginBox">
            <Key sx={{fontSize: '2rem', mr: 1, my: 0.5}} />
            <TextValidator
              fullWidth
              variant="standard"
              label="New password"
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
            <Key sx={{fontSize: '2rem', mr: 1, my: 0.5}} />
            <TextValidator
              fullWidth
              variant="standard"
              label="Repeat password"
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
            <Email sx={{fontSize: '2rem', mr: 1, my: 0.5}} />
            <TextValidator
              fullWidth
              variant="standard"
              label="Email"
              placeholder="Write your email"
              name="email"
              type="email"
              onChange={handleInputChange}
              value={inputs.email}
              validators={validators.email}
              errorMessages={errorMessages.email}
            />
          </Box>
          <Box className="loginBox">
            <Badge sx={{fontSize: '2rem', mr: 1, my: 0.5}} />
            <TextValidator
              fullWidth
              variant="standard"
              label="Full name"
              placeholder="Write your full name"
              name="full_name"
              onChange={handleInputChange}
              value={inputs.full_name}
              validators={validators.full_name}
              errorMessages={errorMessages.full_name}
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
