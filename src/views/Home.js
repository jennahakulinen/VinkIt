import React from 'react';
import MediaTable from '../components/MediaTable';
import {Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Typography component="h1" variant="h2">
        Home
      </Typography>
      <IconButton color="primary" component={Link} to={'/search'}>
        <SearchIcon fontSize="large" />
      </IconButton>
      <MediaTable />
    </>
  );
};

export default Home;
