import React from 'react';
import PropTypes from 'prop-types';
import {CircularProgress, ImageList, Typography} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaTable = ({
  allFiles = true,
  favorites = false,
  searchterm,
  categories = false,
  tag,
}) => {
  const {user} = useContext(MediaContext);
  let {mediaArray, loading, deleteMedia} = useMedia(
    allFiles,
    user?.user_id,
    favorites,
    localStorage.getItem('token'),
    categories,
    tag
  );

  const windowSize = useWindowSize();

  if (searchterm?.length > 0) {
    mediaArray = mediaArray.filter((file) => {
      if (file.title.toLowerCase().includes(searchterm.toLowerCase())) {
        return file;
      }
    });
  }

  if (categories === true) {
    if (mediaArray.length === 0) {
      return (
        <Typography
          sx={{padding: 2, paddingLeft: 4, paddingBottom: 4, fontSize: '14px'}}
        >
          No vinks in this category yet
        </Typography>
      );
    }
  }

  const getPageIndex = (route) => {
    switch (route) {
      case '/':
        return 0;
      case '/login':
        return 1;
      case '/upload':
        return 1;
      case '/myfavorites':
        return 2;
      case '/profile':
        return 3;
      case '/search':
        return 4;
      default:
        return 0;
    }
  };

  const value = getPageIndex(window.location.pathname);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ImageList
          sx={{
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 2,
            paddingLeft: 0.5,
            paddingRight: 0.5,
            paddingBottom: 2,
          }}
          variant={
            value === 2 || value === 3 || value === 4 ? 'standard' : 'masonry'
          }
          cols={
            value === 2 || value === 3 || value === 4
              ? windowSize.width > 768
                ? 4
                : 2
              : windowSize.width > 768
              ? 3
              : 2
          }
          rowHeight={value === 2 || value === 3 || value === 4 ? 220 : 'auto'}
          gap={10}
        >
          {mediaArray.map((item, index) => {
            return (
              <MediaRow
                key={index}
                file={item}
                userId={user?.user_id}
                deleteMedia={deleteMedia}
              />
            );
          })}
        </ImageList>
      )}
    </>
  );
};

MediaTable.propTypes = {
  allFiles: PropTypes.bool,
  favorites: PropTypes.bool,
  searchterm: PropTypes.string,
  categories: PropTypes.bool,
  tag: PropTypes.string,
};

export default MediaTable;
