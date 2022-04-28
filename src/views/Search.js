import {Typography, Box, Button} from '@mui/material';
import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import {TextField, IconButton} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListIcon from '@mui/icons-material/FilterList';
import MediaTable from '../components/MediaTable';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
// import {useNavigate} from 'react-router-dom';

import useForm from '../hooks/FormHooks';
import {getCategoryName} from '../utils/variables';

const Search = () => {
  const alkuarvot = {
    title: '',
  };
  const [searchterm, setSearchterm] = useState('');
  // const navigate = useNavigate();

  const doSearch = async () => {
    console.log('ETSITÄÄN!');
    setSearchterm(inputs.title);
  };

  const showCategories = async () => {
    setSearchterm('');
    getCategoryName.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <Typography>{item}</Typography>
          <MediaTable categories={true} tag={item} />
        </React.Fragment>
      );
    });
  };

  console.log(searchterm);

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doSearch,
    alkuarvot
  );
  return (
    <>
      <BackButton />
      <Box
        sx={{
          marginTop: 0.5,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form style={{paddingTop: 20}} onSubmit={handleSubmit}>
          <TextField
            name="title"
            onChange={handleInputChange}
            sx={{width: 350, margin: 'auto'}}
            id="standard-bare"
            variant="outlined"
            placeholder="Search vinks..."
            InputProps={{
              endAdornment: (
                <IconButton
                  color="bodyTextColor"
                  type="submit"
                  aria-label="search"
                >
                  <SearchRoundedIcon />
                </IconButton>
              ),
            }}
          />
        </form>

        <Box
          sx={{
            width: '90%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{backgroundColor: 'transparent', color: '#48A0B3'}}
            onClick={showCategories}
            startIcon={<ClassOutlinedIcon />}
          >
            Show categories
          </Button>
          <Button
            sx={{backgroundColor: 'transparent', color: '#48A0B3'}}
            startIcon={<FilterListIcon />}
          >
            Filters
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          margin: 'auto',
          textAlign: 'center',
          paddingBottom: 2,
          paddingTop: 2,
        }}
      >
        <Typography variant="fontH1" color="primary">
          Discover!
        </Typography>
      </Box>
      {searchterm ? (
        <>
          <Typography>Search results</Typography>
          <MediaTable searchterm={searchterm} />
        </>
      ) : (
        getCategoryName.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Typography
                variant="fontH4"
                color="bodyTextColor"
                sx={{paddingLeft: 4}}
              >
                {item}
              </Typography>
              <MediaTable categories={true} tag={item} />
            </React.Fragment>
          );
        })
      )}
    </>
  );
};

export default Search;
