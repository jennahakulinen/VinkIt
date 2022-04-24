import React, {useContext} from 'react';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import Rating from '@mui/material/Rating';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Divider,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {safeParseJson} from '../utils/functions';
import BackButton from '../components/BackButton';
import {useEffect, useState} from 'react';
import {useTag, useComment, useUser} from '../hooks/ApiHooks';
import useCommentForm from '../hooks/CommentHook';
import {MediaContext} from '../contexts/MediaContext';
import {ChatBubble} from '@mui/icons-material';

const Single = () => {
  const {user} = useContext(MediaContext);
  const [avatar, setAvatar] = useState({});
  const [username, setUsername] = useState();
  const [comments, setComments] = useState({});
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const file = location.state.file;
  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const {getTag} = useTag();
  const {getComment, postComment, deleteComment} = useComment();
  const {getUserById} = useUser();

  console.log(deleteComment);

  const getUsernameByUserId = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const user = await getUserById(userId, token);
      const username = user.username;
      return username;
    } catch (err) {
      // console.log(err);
    }
  };

  const doDelete = async (e, commentId) => {
    const ok = confirm('Do you want to delete comment?');
    if (ok) {
      try {
        const deleteInfo = await deleteComment(
          commentId,
          localStorage.getItem('token')
        );
        console.log(deleteInfo);
        if (deleteInfo) {
          fetchComments();
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };

  const doComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const commentData = await postComment(
        {
          file_id: file.file_id,
          comment: inputs.comment,
        },
        token
      );
      console.log('Jee kommentti lisätty!', commentData);
      inputs.comment = '';
      fetchComments();
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(comments);

  const {handleSubmitComment, inputs, handleInputChangeComment} =
    useCommentForm(doComment);

  // hae kaikki kommentit

  const fetchComments = async () => {
    try {
      if (file) {
        const comment = await getComment(file.file_id);
        for (let i = 0; i < comment.length; i++) {
          const item = comment[i];
          const userId = item.user_id;
          const username = await getUsernameByUserId(userId);
          item.username = username;
        }
        setComments(comment);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const fetchAvatar = async () => {
    const username = await getUsernameByUserId(file.user_id);
    file.username = username;
    try {
      if (file) {
        const avatars = await getTag('avatar_' + file.user_id);
        const ava = avatars.pop();
        ava.filename = mediaUrl + ava.filename;

        setAvatar(ava);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const getUsernameByUserIdname = async () => {
    try {
      if (file) {
        const username = await getUsernameByUserId(file.user_id);
        setUsername(username);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchAvatar();
    getUsernameByUserIdname();
  }, []);

  return (
    <>
      <Card
        sx={{
          borderRadius: 0,
          position: 'relative',
          boxShadow: 'none',
        }}
      >
        <BackButton />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            height: 50,
            position: 'absolute',
            zIndex: 100,
            right: 0,
            backgroundColor: '#76CFDB',
            borderBottomLeftRadius: 15,
          }}
        >
          <List sx={{marginLeft: 2, marginRight: 2}}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{width: 36, height: 36}}
                  variant={'circle'}
                  src={avatar.filename}
                />
              </ListItemAvatar>
              <Typography
                sx={{
                  fontWeight: '900',
                  fontSize: 14,
                  marginLeft: -1,
                }}
                component="h5"
                variant="fontH6"
              >
                {username}
              </Typography>
            </ListItem>
          </List>
        </Box>
        <CardMedia
          component={file.media_type === 'image' ? 'img' : file.media_type}
          controls={true}
          poster={mediaUrl + file.screenshot}
          src={mediaUrl + file.filename}
          alt={file.title}
          sx={{
            width: '100vw',
            height: '40vh',
            filter: `
          brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          saturate(${filters.saturation}%)
          sepia(${filters.sepia}%)
          `,
          }}
        />
        <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography component="h3" variant="fontH3">
            {file.title}
          </Typography>
          <Typography sx={{paddingTop: 1, paddingBottom: 1}} variant="subtitle">
            {description}
          </Typography>
          <Button
            startIcon={<ChatBubble />}
            color="primaryVariant"
            variant="contained"
            sx={{
              color: '#F7F7F7',
              minWidth: '250px',
              margin: 'auto',
              marginTop: 1,
              marginBottom: 1,
            }}
            onClick={handleClickOpen}
          >
            Leave a comment
          </Button>
          <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
            <DialogTitle
              color="primary"
              component="h3"
              variant="fontH2"
              sx={{textAlign: 'center'}}
            >
              Comment
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <form onSubmit={handleSubmitComment}>
              <DialogContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingTop: 1,
                  paddingBottom: 1,
                }}
              >
                <Typography
                  sx={{margin: 'auto', paddingBottom: 1}}
                  variant="subtitle"
                >
                  Rate vink
                </Typography>
                <Rating
                  sx={{margin: 'auto', paddingBottom: 2}}
                  name="no-value"
                  value={null}
                />
                <Divider />
                <TextField
                  multiline
                  margin="dense"
                  id="name"
                  label="Write a comment..."
                  name="comment"
                  value={inputs.comment}
                  fullWidth
                  variant="outlined"
                  onChange={handleInputChangeComment}
                  sx={{marginTop: 2}}
                />
              </DialogContent>
              <DialogActions sx={{justifyContent: 'center', paddingBottom: 2}}>
                <Button
                  width="50%"
                  color="primary"
                  type="submit"
                  variant="contained"
                  onClick={handleClose}
                >
                  Send
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <ListItem className="commentTitle">
            <Typography component="h3" variant="fontH4">
              Comments
            </Typography>
            {comments.length > 0 ? (
              <Typography component="h3" variant="fontH4" sx={{marginLeft: 1}}>
                ({comments.length})
              </Typography>
            ) : (
              <Typography component="h3" variant="fontH4"></Typography>
            )}
          </ListItem>

          <List>
            {comments.length > 0 ? (
              comments.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item.user_id === user.user_id ? (
                      <>
                        <ListItem
                          sx={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            borderLeft: 5,
                            borderLeftColor: '#76CFDB',
                            paddingRight: 5,
                          }}
                          key={item.comment_id}
                        >
                          <Typography variant="body1">
                            {item.comment}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 900,
                            }}
                            component="h5"
                            variant="fontH6"
                          >
                            {item.username}
                          </Typography>
                          <IconButton
                            sx={{
                              position: 'absolute',
                              right: 0,
                              top: '20%',
                            }}
                            onClick={(e) => {
                              doDelete(e, item.comment_id);
                            }}
                          >
                            <CloseIcon sx={{color: '#48A0B3'}} />
                          </IconButton>
                        </ListItem>
                        <Divider />
                      </>
                    ) : (
                      <>
                        <ListItem
                          sx={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            borderLeft: 5,
                            borderLeftColor: 'transparent',
                            paddingRight: 5,
                          }}
                          key={item.comment_id}
                        >
                          <Typography variant="body1">
                            {item.comment}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 900,
                            }}
                            component="h5"
                            variant="fontH6"
                          >
                            {item.username}
                          </Typography>
                        </ListItem>
                        <Divider />
                      </>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <ListItem>
                <Typography variant="body1">
                  No comments yet. Be the first one! 🙂
                </Typography>
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

// TODO in the next task: add propType for location

export default Single;
