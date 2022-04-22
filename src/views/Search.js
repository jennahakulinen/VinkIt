// eslint-disable-next-line no-unused-vars
import {Typography} from '@mui/material';
import React from 'react';
import BackButton from '../components/BackButton';
import {TextField, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const Search = () => {
  return (
    <>
      <BackButton />
      <Typography component="h1" variant="h2">
        Discover!
      </Typography>
      <TextField
        style={{width: 300}}
        id="standard-bare"
        variant="outlined"
        placeholder="Search vinks.."
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span>All filters</span>
        <IconButton color="primary">
          <FilterListIcon />
        </IconButton>
      </div>
    </>
  );
};

export default Search;
