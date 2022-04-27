import React from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {useState, useEffect} from 'react';
import {appID} from '../utils/variables';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Nav from '../components/Nav';

const Upload = () => {
  const [preview, setPreview] = useState('logo192.png');
  const [category, setCategory] = useState('');
  const alkuarvot = {
    title: '',
    description: '',
    file: null,
  };

  const filterarvot = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    username: ['required field', 'minimum 3 characters'],
    description: ['minimum 5 characters'],
  };

  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const getCategoryName = ['Home', 'Hobbies', 'Restaurants'];

  const doUpload = async () => {
    try {
      console.log('doUpload');
      // lisätään filtterit descriptioniin
      const desc = {
        description: inputs.description,
        filters: filterInputs,
      };
      const token = localStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('title', inputs.title);
      formdata.append('description', JSON.stringify(desc));
      formdata.append('file', inputs.file);
      const mediaData = await postMedia(formdata, token);
      const tagData = await postTag(
        {
          file_id: mediaData.file_id,
          // jos haku tägeillä, tägin pitää olla uniikki: *inputs* + appID
          tag: appID,
        },
        token
      );
      const categoryTag = await postTag(
        {
          file_id: mediaData.file_id,
          tag: category,
        },
        token
      );

      confirm(tagData.message, categoryTag.message, category) && navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    alkuarvot
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filterarvot
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

  console.log(inputs, filterInputs);

  return (
    <>
      <Nav />
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" gutterBottom>
            Upload
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              fullWidth
              placeholder="title"
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
              validators={validators.title}
              errorMessages={errorMessages.title}
            />
            <TextValidator
              fullWidth
              placeholder="description"
              name="description"
              onChange={handleInputChange}
              value={inputs.description}
              validators={validators.description}
              errorMessages={errorMessages.description}
            />

            <TextValidator
              fullWidth
              type="file"
              name="file"
              accept="image/*, video/*, audio/*"
              onChange={handleInputChange}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {getCategoryName.map((index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {index}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={getTagList}
              sx={{width: 300}}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            /> */}

            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
                disabled={!inputs.file}
              >
                Upload
              </Button>
            )}
          </ValidatorForm>
        </Grid>
      </Grid>
      {inputs.file && (
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
              src={preview}
              alt="preview"
            />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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

export default Upload;
