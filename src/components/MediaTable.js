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
  console.log(mediaArray);
  if (searchterm?.length > 0) {
    mediaArray = mediaArray.filter((file) => {
      if (file.title.toLowerCase().includes(searchterm.toLowerCase())) {
        return file;
      }
    });
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ImageList
          sx={{marginLeft: 2, marginRight: 2}}
          variant="masonry"
          cols={windowSize.width > 768 ? 3 : 2}
          gap={10}
        >
          {mediaArray.map((item, index) => {
            return (
              <MediaRow
                key={index}
                file={item}
                userId={user.user_id}
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
