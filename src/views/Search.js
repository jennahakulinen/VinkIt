import {Typography} from '@mui/material';
import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import {TextField, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MediaTable from '../components/MediaTable';

// import {useNavigate} from 'react-router-dom';

import useForm from '../hooks/FormHooks';

const Search = () => {
  // const navigate = useNavigate();
  const alkuarvot = {
    title: '',
  };
  const [searchterm, setSearchterm] = useState('');

  const doSearch = async () => {
    setSearchterm(inputs.title);
  };
  const {inputs, handleInputChange, handleSubmit} = useForm(
    doSearch,
    alkuarvot
  );
  return (
    <>
      <BackButton />
      <Typography component="h1" variant="h2">
        Discover!
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          onChange={handleInputChange}
          style={{width: 300}}
          id="standard-bare"
          variant="outlined"
          placeholder="Search vinks..."
          InputProps={{
            endAdornment: (
              <IconButton color="primary" type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </form>

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
      <MediaTable searchterm={searchterm} />
    </>
  );
};

export default Search;
