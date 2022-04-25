import React from 'react';
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {Button} from '@mui/material';

const HeartButton = (props) => {
  const testi = false;
  return (
    <Button
      {...props}
      startIcon={testi ? <Favorite /> : <FavoriteBorder />}
      style={{color: 'red'}}
    ></Button>
  );
};

export default HeartButton;
