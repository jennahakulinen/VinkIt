import React from 'react';
import MediaTable from '../components/MediaTable';
import {Typography} from '@mui/material';
// import {useLocation} from 'react-router-dom';

const MyFavorites = () => {
  return (
    <>
      <Typography component="h1" variant="h2">
        My Favorites
      </Typography>
      <MediaTable favorites={true} />
    </>
  );
};

export default MyFavorites;
