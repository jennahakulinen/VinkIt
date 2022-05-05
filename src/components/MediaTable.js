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
  referrer,
}) => {
  const {user} = useContext(MediaContext);
  let {mediaArray, loading, deleteMedia} = useMedia(
    allFiles,
    user,
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

  const getPageIndex = (route) => {
    switch (route) {
      case '/~jennash/MPJKK/Project/':
        return 0;
      case '/~jennash/MPJKK/Project/login':
        return 1;
      case '/~jennash/MPJKK/Project/upload':
        return 1;
      case '/~jennash/MPJKK/Project/myfavorites':
        return 2;
      case '/~jennash/MPJKK/Project/profile':
        return 3;
      case '/~jennash/MPJKK/Project/search':
        return 4;
      default:
        return 0;
    }
  };

  const value = getPageIndex(window.location.pathname);

  return (
    <>
      {categories && mediaArray.length === 0 && (
        <Typography
          sx={{
            paddingLeft: 4,
            fontSize: '14px',
          }}
        >
          No vinks in this category yet
        </Typography>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
                  referrer={referrer}
                />
              );
            })}
          </ImageList>
        </>
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
  referrer: PropTypes.string,
};

export default MediaTable;
