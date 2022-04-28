import {Typography, Box} from '@mui/material';
import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import {TextField, IconButton} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListIcon from '@mui/icons-material/FilterList';
import MediaTable from '../components/MediaTable';
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
            paddingLeft: 30,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span>All categories</span>
          <IconButton onClick={showCategories} color="primary">
            <FilterListIcon />
          </IconButton>
          <span>Filters</span>
          <IconButton color="primary">
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{margin: 'auto', textAlign: 'center', paddingBottom: 2}}>
        <Typography variant="fontH1" color="primary">
          Discover!
        </Typography>
      </Box>
      {searchterm ? (
        <MediaTable searchterm={searchterm} />
      ) : (
        getCategoryName.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Typography>{item}</Typography>
              <MediaTable categories={true} tag={item} />
            </React.Fragment>
          );
        })
      )}
    </>
  );
};

export default Search;
