import React from 'react';
import MediaTable from '../components/MediaTable';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <IconButton color="primary" component={Link} to={'/search'}>
        <SearchIcon fontSize="large" />
      </IconButton>
      <MediaTable />
    </>
  );
};

export default Home;
