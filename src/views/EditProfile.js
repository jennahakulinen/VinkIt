import React, {useContext, useEffect} from 'react';
import {Button, Card, CircularProgress, Grid, Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import {Box} from '@mui/system';
import {useUser} from '../hooks/ApiHooks';

import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useNavigate} from 'react-router-dom';

import useForm from '../hooks/FormHooks';
import {MediaContext} from '../contexts/MediaContext';

const EditProfile = () => {
  const {user} = useContext(MediaContext);

  console.log(user);

  const alkuarvot = {
    username: user.username,
    email: user.email,
    password: '',
  };

  const validators = {
    username: ['minStringLength: 2', 'isAvailable'],
    email: ['isEmail'],
    password: ['matchRegexp:^(?:.{6,}|)$'],
  };

  const errorMessages = {
    username: [
      'Username must be two or more characters',
      'This username is already taken',
    ],
    email: ['Please enter a valid email address'],
    password: ['Passwords must be six or more characters'],
  };

  const {putUser, loading, getUsername} = useUser();
  const navigate = useNavigate();

  const doModifyUser = async () => {
    try {
      console.log('doUpload');

      const data = {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      };
      if (data.password.length === 0) {
        delete data.password;
      }

      const token = localStorage.getItem('token');
      const userData = await putUser(data, token);
      confirm(userData.message) && navigate(-1);
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doModifyUser,
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

    return () => {
      ValidatorForm.removeValidationRule('isAvailable');
    };
  }, [inputs]);

  console.log(inputs);

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
          <ValidatorForm onSubmit={handleSubmit}>
            <Box className="formBox">
              <TextValidator
                fullWidth
                label="Change profile picture"
                InputLabelProps={{
                  shrink: true,
                }}
                type="file"
                name="file"
                accept="image/*, video/*, audio/*"
                onChange={handleInputChange}
              />
            </Box>
            <Box className="formBox">
              <TextValidator
                fullWidth
                label="Change username"
                placeholder="Edit username"
                name="username"
                onChange={handleInputChange}
                value={inputs.username}
                validators={validators.username}
                errorMessages={errorMessages.username}
              />
            </Box>
            <Box className="formBox">
              <TextValidator
                fullWidth
                label="Change email"
                placeholder="Edit email"
                name="email"
                onChange={handleInputChange}
                value={inputs.email}
                validators={validators.email}
                errorMessages={errorMessages.email}
              />
            </Box>
            <Box className="formBox">
              <TextValidator
                fullWidth
                label="Change password"
                placeholder="New password"
                name="password"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
                value={inputs.password}
                validators={validators.password}
                errorMessages={errorMessages.password}
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
                >
                  Save changes
                </Button>
              </Box>
            )}
          </ValidatorForm>
        </Card>
      </Grid>
    </>
  );
};

export default EditProfile;
