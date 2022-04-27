import React from 'react';
import MediaTable from '../components/MediaTable';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import {Typography, Box} from '@mui/material';
import Nav from '../components/Nav';

const Home = () => {
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
        <IconButton color="primary" component={Link} to={'/search'}>
          <SearchIcon fontSize="large" />
        </IconButton>
      </Box>
      <MediaTable />
    </>
  );
};

export default Home;
