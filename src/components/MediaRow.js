import React, {useEffect, useState} from 'react';
import {ImageListItem, ImageListItemBar} from '@mui/material';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {safeParseJson} from '../utils/functions';
import HeartButton from './HeartButton';
import {useFavourite} from '../hooks/ApiHooks';
// import {DeleteOutline} from '@mui/icons-material';

const MediaRow = ({file, userId, deleteMedia}) => {
  const {user} = useContext(MediaContext);
  const [userfav, setUserfav] = useState(0);
  const {addFavorite, getFavouriteById, deleteFavourite} = useFavourite();

  // const doDelete = async () => {
  //   const ok = confirm('Are you sure?');
  //   if (ok) {
  //     try {
  //       const deleteInfo = await deleteMedia(
  //         file.file_id,
  //         localStorage.getItem('token')
  //       );
  //       if (deleteInfo) {
  //         setUpdate(!update);
  //       }
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   }
  // };

  const doFavorite = async () => {
    try {
      const favoriteInfo = await addFavorite(
        {file_id: file.file_id},
        localStorage.getItem('token')
      );
      if (favoriteInfo) {
        console.log(favoriteInfo);
        setUserfav(1);
      }
    } catch (err) {
      //  console.log(err);
    }
  };
  const fetchFavorites = async () => {
    try {
      const favInfo = await getFavouriteById(
        localStorage.getItem('token'),
        file.file_id
      );
      favInfo.forEach((fav) => {
        fav.user_id === user.user_id && setUserfav(1);
      });
    } catch (err) {
      //  console.log(err);
    }
  };
  const doDeletefavourite = async () => {
    const ok = confirm('Do you want to delete favorite?');
    if (ok) {
      try {
        const deleteFav = await deleteFavourite(
          file.file_id,
          localStorage.getItem('token')
        );
        if (deleteFav) {
          console.log(deleteFav);
          setUserfav(0);
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };

  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <ImageListItem
      key={file.file_id}
      component={Link}
      to={'/single'}
      state={{file}}
    >
      <img
        src={file.thumbnails ? mediaUrl + file.thumbnails.w320 : 'logo512.png'}
        alt={file.title}
        loading="lazy"
        style={{
          borderRadius: 15,
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
          filter: `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        sepia(${filters.sepia}%)
        `,
        }}
      />

      <ImageListItemBar
        sx={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          backgroundColor: 'white',
          color: '#05192C',
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        }}
        actionIcon={
          user ? (
            <HeartButton
              name="likeButton"
              sx={{zIndex: 100}}
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log(e);
                userfav ? doDeletefavourite() : doFavorite();
              }}
              userfav={userfav}
            ></HeartButton>
          ) : null
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
