import React, { memo, useCallback, useState } from 'react';
import {
  Avatar,
  MenuItem,
  Card,
  CardHeader,
  IconButton,
  Typography,
  Divider,
  withStyles,
  Grid,
  Menu,
  makeStyles,
  CardMedia,
  Box,
} from '@material-ui/core';
import { Favorite, FavoriteBorderOutlined, MoreVert, Share } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// COMPONENT
import ButtonComponent from '../../../app/layout/ButtonComponent';
import Prompt from '../../../app/common/dialog/Prompt';
import { useTargetClick } from '../../../app/hooks/useTargetClick';
import { useToggleClick } from '../../../app/hooks/useToggleClick';
import {
  deleteLikesEvent,
  eventParticipateFirestore,
  eventOutFirestore,
  likesEvent,
} from '../../../app/firestore/firestoreService';
import { useSnackbar } from 'notistack';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  menu: {
    '& .MuiMenu-paper': theme.palette.background.default,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    '& .MuiCardMedia-img': {
      width: '100%',
    },
  },
}));

export default memo(function EventDetailedHeader({ event, isHost, isGoing }) {
  const classes = useStyles();
  const history = useHistory();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { authenticated } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useTargetClick(null);
  const [dialogOpen, setDialogOpen] = useToggleClick(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const DialogClose = useCallback(() => {
    setAnchorEl(null);
    setDialogOpen(true);
  }, [setAnchorEl, setDialogOpen]);

  function modifyEvent() {
    setAnchorEl(null);
    history.push(`/manage/${event.id}`);
  }

  const handleLike = useCallback(async () => {
    if (!currentUserProfile) return history.push('/login');

    if (currentUserProfile && currentUserProfile?.likesEvent.indexOf(event.id) !== -1) {
      await deleteLikesEvent(event.id);
    } else {
      await likesEvent(event.id);
    }
  }, [currentUserProfile, event.id, history]);

  const eventParticapate = useCallback(async () => {
    if (!authenticated) return history.push('/login');

    setLoading(true);
    try {
      await eventParticipateFirestore(event.id);
      enqueueSnackbar('이벤트에 참가하였습니다.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('이벤트 참가에 실패하였습니다.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [authenticated, enqueueSnackbar, event.id, history]);

  const eventOut = useCallback(async () => {
    setLoading(true);
    try {
      await eventOutFirestore(event.id);
      enqueueSnackbar('이벤트에 나갔습니다.', { variant: 'warning' });
    } catch (error) {
      enqueueSnackbar('이벤트 참가에 실패하였습니다.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, event.id]);

  return (
    <Grid container>
      <Prompt open={dialogOpen} setOpen={setDialogOpen} eventId={event.id} />
      <Grid item xs={12}>
        <Card raised={true}>
          <CardHeader
            avatar={
              <Avatar
                src={event.hostPhotoURL || null}
                component={Link}
                to={`/profile/${event.hostUid}`}
                aria-label='avatar'
              />
            }
            action={
              isHost && (
                <>
                  <IconButton aria-label='settings' onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVert />
                  </IconButton>
                  <StyledMenu
                    className={classes.menu}
                    id='event-menu'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={modifyEvent}>수정하기</MenuItem>
                    <Divider variant='fullWidth' />
                    <MenuItem onClick={DialogClose}>삭제하기</MenuItem>
                  </StyledMenu>
                </>
              )
            }
            title={
              <Typography variant='subtitle1' component='h2'>
                {event.title}
              </Typography>
            }
          />
          <CardMedia
            className={classes.media}
            image={event.thumbnailURL || `/assets/categoryImages/${event.category}.jpg`}
            title={event.title}
          />
          <Box p={1}>
            <Box display='flex' flexDirection='row-reverse' justifyContent='space-between'>
              <Box display='flex' alignItems='center'>
                <Box>
                  <IconButton onClick={handleLike}>
                    {currentUserProfile && currentUserProfile.likesEvent.indexOf(event.id) !== -1 ? (
                      <Favorite color='primary' />
                    ) : (
                      <FavoriteBorderOutlined color='primary' />
                    )}
                  </IconButton>
                  {event.likes > 0 ? event.likes : ''}
                </Box>
                <IconButton aria-label='share'>
                  <Share />
                </IconButton>
              </Box>
              <Box>
                {isGoing ? (
                  <ButtonComponent
                    variant='contained'
                    loading={loading}
                    content='이벤트 나가기'
                    onClick={eventOut}
                    disabled={isHost}
                  />
                ) : (
                  <ButtonComponent
                    color='primary'
                    variant='contained'
                    loading={loading}
                    content={event.attendeeIds === event.member ? '이벤트 만석' : '이벤트 참가하기'}
                    onClick={eventParticapate}
                    disabled={event.attendeeIds === event.member}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
});
