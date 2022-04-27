import React from 'react';
import PropTypes from 'prop-types';
import {CircularProgress, ImageList} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaTable = ({allFiles = true, favorites = false, searchterm}) => {
  const {user} = useContext(MediaContext);
  let {mediaArray, loading, deleteMedia} = useMedia(
    allFiles,
    user?.user_id,
    favorites,
    localStorage.getItem('token')
  );
  const windowSize = useWindowSize();
  if (searchterm?.length > 0) {
    mediaArray = mediaArray.filter((file) => {
      if (file.title.toLowerCase().includes(searchterm.toLowerCase())) {
        return file;
      }
    });
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
      default:
        return 0;
    }
  };

  const value = getPageIndex(window.location.pathname);
  console.log(value);

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
            paddingBottom: 1,
          }}
          variant={value === 2 ? 'standard' : 'masonry'}
          cols={
            value === 2
              ? windowSize.width > 600
                ? 4
                : 2
              : windowSize.width > 768
              ? 3
              : 2
          }
          rowHeight={value === 2 ? 250 : 'auto'}
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
};

export default MediaTable;
