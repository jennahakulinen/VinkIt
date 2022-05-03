import {Typography, Box, Button, Divider} from '@mui/material';
import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import {TextField, IconButton} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListIcon from '@mui/icons-material/FilterList';
import MediaTable from '../components/MediaTable';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
// import {useNavigate} from 'react-router-dom';

import useForm from '../hooks/FormHooks';
import {getCategoryName} from '../utils/variables';

const Search = () => {
  const alkuarvot = {
    title: '',
  };
  const [searchterm, setSearchterm] = useState('');
  // const navigate = useNavigate();

  const doSearch = async () => {
    setSearchterm(inputs.title);
  };

  const showCategories = async () => {
    setSearchterm('');
    getCategoryName.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <Typography>{item}</Typography>
          <MediaTable categories={true} tag={item} />
        </React.Fragment>
      );
    });
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doSearch,
    alkuarvot
  );
  return (
    <>
      <BackButton />
      <Box
        sx={{
          margin: 'auto',
          textAlign: 'center',
          paddingBottom: 2,
          paddingTop: 2.5,
        }}
      >
        <Typography variant="fontH1" color="primary">
          Discover!
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 0.5,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form style={{width: '70%', paddingTop: 5}} onSubmit={handleSubmit}>
          <TextField
            name="title"
            onChange={handleInputChange}
            sx={{width: '100%', margin: 'auto'}}
            id="standard-bare"
            variant="outlined"
            placeholder="Search vinks..."
            InputProps={{
              endAdornment: (
                <IconButton
                  color="bodyTextColor"
                  type="submit"
                  aria-label="search"
                >
                  <SearchRoundedIcon />
                </IconButton>
              ),
            }}
          />
        </form>

        <Box
          sx={{
            width: '90%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: 3,
          }}
        >
          <Button
            sx={{backgroundColor: 'transparent', color: '#48A0B3'}}
            onClick={showCategories}
            startIcon={<ClassOutlinedIcon />}
          >
            Show categories
          </Button>
          <Button
            sx={{backgroundColor: 'transparent', color: '#48A0B3'}}
            startIcon={<FilterListIcon />}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {searchterm ? (
        <>
          <Typography
            variant="fontH5"
            color="bodyTextColor"
            sx={{paddingLeft: 4}}
          >
            Search results for{' '}
            <span style={{color: '#48A0B3'}}>{searchterm}</span>
          </Typography>
          <Divider
            sx={{
              width: '95%',
              margin: 'auto',
              marginTop: 1,
              marginBottom: 1,
            }}
          />
          <MediaTable searchterm={searchterm} />
        </>
      ) : (
        getCategoryName.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="fontH4"
                  color="bodyTextColor"
                  sx={{paddingLeft: 4}}
                >
                  {item}
                </Typography>
                <Button
                  className="categoryBut"
                  sx={{marginRight: 4, paddingRight: 1, paddingLeft: 1}}
                  size="small"
                >
                  See all from {item}
                </Button>
              </Box>
              <Divider
                sx={{
                  width: '95%',
                  margin: 'auto',
                  marginTop: 1,
                  marginBottom: 1,
                }}
              />
              <MediaTable categories={true} tag={item} />
            </React.Fragment>
          );
        })
      )}
    </>
  );
};

export default Search;
