import React from 'react';
import MediaTable from '../components/MediaTable';
import {Typography} from '@mui/material';
import Nav from '../components/Nav';
// import {useLocation} from 'react-router-dom';

const MyFavorites = () => {
  return (
    <>
      <Nav />
      <Typography component="h1" variant="h2">
        My Favorites
      </Typography>
      <MediaTable favorites={true} />
    </>
  );
};

export default MyFavorites;
