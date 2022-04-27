import React from 'react';
import MediaTable from '../components/MediaTable';
import {Typography, Box} from '@mui/material';
import Nav from '../components/Nav';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import {useLocation} from 'react-router-dom';

const MyFavorites = () => {
  return (
    <>
      <Nav />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Typography variant="fontH1" color="primary">
          Vink it!
        </Typography>
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <FavoriteIcon sx={{paddingRight: 1, color: '#FF2222'}} />
          <Typography
            sx={{paddingRight: 1, letterSpacing: 1}}
            variant="fontH4"
            color="bodyTextColor"
          >
            Favorites
          </Typography>
        </Box>
      </Box>
      <MediaTable favorites={true} />
    </>
  );
};

export default MyFavorites;
