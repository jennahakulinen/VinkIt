import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CircularProgress, Grid, Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import {Box} from '@mui/system';
import {useUser, useTag, useMedia} from '../hooks/ApiHooks';

import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useNavigate} from 'react-router-dom';

import useForm from '../hooks/FormHooks';
import {MediaContext} from '../contexts/MediaContext';

const EditProfile = () => {
  const {user} = useContext(MediaContext);
  const [preview, setPreview] = useState('logo192.png');
  const {postTag} = useTag();

  console.log(user);

  const alkuarvot = {
    email: user.email,
    password: '',
  };

  const validators = {
    email: ['isEmail'],
    password: ['matchRegexp:^(?:.{6,}|)$'],
  };

  const errorMessages = {
    email: ['Please enter a valid email address'],
    password: ['Passwords must be six or more characters'],
  };

  const {putUser, loading} = useUser();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const doModifyUser = async () => {
    try {
      console.log('doUpload');
      console.log('doUploadAvatar');
      if (inputs.file) {
        const token = localStorage.getItem('token');
        const formdata = new FormData();
        formdata.append('file', inputs.file);
        const mediaData = await postMedia(formdata, token);
        const tagData = await postTag(
          {
            file_id: mediaData.file_id,
            tag: 'avatar_' + user.user_id,
          },
          token
        );
        console.log(tagData.message);
        console.log('avatar added!');
      }

      const data = {
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
    if (inputs.file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(inputs.file);
    }
  }, [inputs.file]);

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
            marginBottom={1}
          >
            Edit Profile
          </Typography>
          {inputs.file && (
            <>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 4,
                }}
              >
                <img
                  style={{
                    width: '250px',
                    height: '250px',
                    objectFit: 'cover',
                    margin: 'auto',
                    borderRadius: '50%',
                    border: '2px solid #76CFDB',
                  }}
                  src={preview}
                  alt="preview"
                />
              </Box>
            </>
          )}
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
