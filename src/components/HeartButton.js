import React from 'react';
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {Button} from '@mui/material';
import PropTypes from 'prop-types';

const HeartButton = (props) => {
  const userfav = props.userfav;
  return (
    <Button
      size="large"
      className="heartButton"
      {...props}
      startIcon={userfav ? <Favorite /> : <FavoriteBorder />}
      sx={{
        color: 'red',
        width: 2,
        borderRadius: 20,
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    ></Button>
  );
};
HeartButton.propTypes = {userfav: PropTypes.number};

export default HeartButton;
