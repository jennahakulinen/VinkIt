import React from 'react';
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {Button} from '@mui/material';
import PropTypes from 'prop-types';

const HeartButton = (props) => {
  const userfav = props.userfav;
  return (
    <Button
      {...props}
      startIcon={userfav ? <Favorite /> : <FavoriteBorder />}
      style={{color: 'red'}}
    ></Button>
  );
};
HeartButton.propTypes = {userfav: PropTypes.number};

export default HeartButton;
