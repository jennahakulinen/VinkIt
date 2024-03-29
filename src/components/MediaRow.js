import React, {useEffect, useState} from 'react';
import {
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {safeParseJson} from '../utils/functions';
import HeartButton from './HeartButton';
import {useFavourite, useTag} from '../hooks/ApiHooks';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import {DeleteOutline} from '@mui/icons-material';

const MediaRow = ({file, userId, deleteMedia, referrer}) => {
  const {update, setUpdate} = useContext(MediaContext);
  const {user} = useContext(MediaContext);
  const [userfav, setUserfav] = useState(0);
  const [fileTags, setFileTags] = useState();
  const {addFavorite, getFavouriteById, deleteFavourite} = useFavourite();
  const {getFileTags} = useTag();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doDelete = async () => {
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
  };

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
  };

  const fetchFileTags = async () => {
    try {
      if (file) {
        const filetags = await getFileTags(file.file_id);
        const tag = filetags[0];
        setFileTags(tag);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  // eslint-disable-next-line no-unused-vars
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
    fetchFileTags();
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return (
    <>
      <ImageListItem
        key={file.file_id}
        component={Link}
        to={'/single'}
        state={{file, referrer}}
      >
        <img
          src={
            file.thumbnails ? mediaUrl + file.thumbnails.w320 : 'logo512.png'
          }
          alt={file.title}
          loading="lazy"
          style={{
            overflow: 'hidden',
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
            <>
              {userId === file.user_id && (
                <IconButton
                  color="bodyTextColor"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleClickOpen();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {user && (
                <HeartButton
                  name="likeButton"
                  sx={{zIndex: 100}}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    userfav ? doDeletefavourite() : doFavorite();
                  }}
                  userfav={userfav}
                ></HeartButton>
              )}
            </>
          }
          subtitle={fileTags ? fileTags.tag : null}
          title={file.title}
        />
      </ImageListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          color="primary"
          component="h3"
          variant="fontH2"
          sx={{textAlign: 'center', paddingTop: 3, paddingBottom: 3}}
          id="alert-dialog-title"
        >
          {'Delete vink'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="fontH5"
            color="bodyTextColor"
            sx={{fontWeight: '400'}}
            id="alert-dialog-description"
          >
            Are you sure you want to delete this vink?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{margin: 'auto', padding: 2}}>
          <Button className="cancelButton" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="backButton"
            onClick={() => {
              handleClose();
              doDelete();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  userId: PropTypes.number,
  deleteMedia: PropTypes.func,
  referrer: PropTypes.string,
};

export default MediaRow;
