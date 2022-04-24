import React from 'react';
import {ArrowBackIosNew} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      sx={{
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 100,
        backgroundColor: '#76CFDB',
      }}
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowBackIosNew sx={{color: '#05192C'}} />
    </IconButton>
  );
};

export default BackButton;
