import React from 'react';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import {IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const BackButtonHome = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      className="backButton"
      sx={{
        width: 36,
        height: 36,
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        zIndex: 100,
        backgroundColor: '#48A0B3',
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}
      onClick={() => {
        navigate('/');
      }}
    >
      <ArrowBackIosNewRoundedIcon
        color="backgroundColor"
        sx={{
          fontSize: 26,
          paddingRight: 0.5,
        }}
      />
    </IconButton>
  );
};

export default BackButtonHome;
