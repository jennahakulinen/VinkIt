import React from 'react';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Slider,
  Typography,
} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
import {useNavigate, useLocation} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {safeParseJson} from '../utils/functions';
import {mediaUrl} from '../utils/variables';
import BackButton from '../components/BackButton';
import {Box} from '@mui/system';

const Modify = () => {
  const location = useLocation();
  const file = location.state.file;

  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  console.log(file);

  const alkuarvot = {
    title: file.title,
    description: description,
  };

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    username: ['required field', 'minimum 3 characters'],
    description: ['minimum 5 characters'],
  };

  const {putMedia, loading} = useMedia();
  const navigate = useNavigate();

  const doModify = async () => {
    try {
      console.log('doUpload');
      // lisätään filtterit descriptioniin
      const desc = {
        description: inputs.description,
        filters: filterInputs,
      };
      // tee sopiva objekti lähetettäväksi
      const data = {
        title: inputs.title,
        description: JSON.stringify(desc),
      };

      const token = localStorage.getItem('token');
      const mediaData = await putMedia(file.file_id, data, token);
      confirm(mediaData.message) && navigate(-1);
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doModify,
    alkuarvot
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filters
  );

  console.log(inputs, filterInputs);

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
            Edit Vink
          </Typography>
        </Grid>
        <Card sx={{marginBottom: '20px', width: '90%'}}>
          <ValidatorForm onSubmit={handleSubmit}>
            <Box className="formBox">
              <TextValidator
                fullWidth
                label="Title"
                placeholder="Edit title"
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
                validators={validators.title}
                errorMessages={errorMessages.title}
              />
            </Box>
            <Box className="formBox">
              <TextValidator
                fullWidth
                label="Description"
                placeholder="Edit description"
                name="description"
                onChange={handleInputChange}
                value={inputs.description}
                validators={validators.description}
                errorMessages={errorMessages.description}
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

      {file && (
        <Grid container>
          <Grid item xs={12}>
            <img
              style={{
                width: '100%',
                filter: `
              brightness(${filterInputs.brightness}%)
              contrast(${filterInputs.contrast}%)
              saturate(${filterInputs.saturation}%)
              sepia(${filterInputs.sepia}%)
              `,
              }}
              src={mediaUrl + file.filename}
              alt="preview"
            />
          </Grid>
          <Grid container>
            <Grid item xs={12} padding={3}>
              <Typography>Brightness</Typography>
              <Slider
                name="brightness"
                min={0}
                max={200}
                step={1}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={filterInputs.brightness}
              />
            </Grid>
            <Grid item xs={12} padding={3}>
              <Typography>Contrast</Typography>
              <Slider
                name="contrast"
                min={0}
                max={200}
                step={1}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={filterInputs.contrast}
              />
            </Grid>
            <Grid item xs={12} padding={3}>
              <Typography>Saturation</Typography>
              <Slider
                name="saturation"
                min={0}
                max={200}
                step={1}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={filterInputs.saturation}
              />
            </Grid>
            <Grid item xs={12} px={3}>
              <Typography>Sepia</Typography>
              <Slider
                name="sepia"
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={filterInputs.sepia}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Modify;
