import React from 'react';
import {
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {safeParseJson} from '../utils/functions';
import HeartButton from './HeartButton';
import {useFavourite} from '../hooks/ApiHooks';
import {Visibility} from '@mui/icons-material';
// import {DeleteOutline} from '@mui/icons-material';

const MediaRow = ({file, userId, deleteMedia}) => {
  const {update, setUpdate} = useContext(MediaContext);
  const {addFavorite} = useFavourite();
  const doDelete = async () => {
    const ok = confirm('Are you sure?');
    if (ok) {
      try {
        const deleteInfo = await deleteMedia(
          file.file_id,
          localStorage.getItem('token')
        );
        if (deleteInfo) {
          setUpdate(!update);
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };
  const doFavorite = async () => {
    try {
      const favoriteInfo = await addFavorite(
        {file_id: file.file_id},
        localStorage.getItem('token')
      );
      if (favoriteInfo) {
        console.log(favoriteInfo);
      }
    } catch (err) {
      //  console.log(err);
    }
  };
  // const doDeletefavourite = async () => {
  //   const ok = confirm('Do you want to delete favorite?');
  //   if (ok) {
  //     try {
  //       const deleteFav = await deleteFavourite(
  //         file.file_id,
  //         localStorage.getItem('token')
  //       );
  //       if (deleteFav) {
  //         console.log(deleteFav);
  //       }
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   }
  // };

  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  return (
    <ImageListItem key={file.file_id}>
      <img
        src={file.thumbnails ? mediaUrl + file.thumbnails.w320 : 'logo512.png'}
        alt={file.title}
        loading="lazy"
        style={{
          borderRadius: 15,
          filter: `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        sepia(${filters.sepia}%)
        `,
        }}
      />

      <ImageListItemBar
        sx={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
        actionIcon={
          <>
            <IconButton
              variant="contained"
              component={Link}
              to={'/single'}
              state={{file}}
            >
              <Visibility View />
            </IconButton>
            <HeartButton variant="contained" onClick={doFavorite}></HeartButton>
            {/* <DeleteOutline variant="contained" onClick={doDeletefavourite} /> */}

            {userId === file.user_id && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={'/modify'}
                  state={{file}}
                >
                  Edit
                </Button>
                <Button variant="contained" onClick={doDelete}>
                  Delete
                </Button>
              </>
            )}
          </>
        }
        title={file.title}
        subtitle={description}
      />
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  userId: PropTypes.number,
  deleteMedia: PropTypes.func,
};

export default MediaRow;
