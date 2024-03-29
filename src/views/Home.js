import React from 'react';
import MediaTable from '../components/MediaTable';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
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
        <Link to="/" style={{textDecoration: 'none'}}>
          <Typography variant="fontH1" color="primary">
            Vink it!
          </Typography>
        </Link>
        <IconButton color="bodyTextColor" component={Link} to={'/search'}>
          <SearchRoundedIcon fontSize="large" />
        </IconButton>
      </Box>
      <MediaTable referrer="/" />
    </>
  );
};

export default Home;
