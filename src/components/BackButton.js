import React from 'react';
import {ArrowBackIosNew} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      sx={{
        width: 36,
        height: 36,
        position: 'absolute',
        top: 5,
        left: 7,
        zIndex: 100,
        backgroundColor: '#76CFDB',
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowBackIosNew
        color="backgroundColor"
        sx={{
          fontSize: 26,
          paddingRight: 0.5,
        }}
      />
    </IconButton>
  );
};

export default BackButton;
