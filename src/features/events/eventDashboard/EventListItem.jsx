import React, { memo, useCallback } from 'react';
import {
  makeStyles,
  withStyles,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  CardActionArea,
} from '@material-ui/core';
import { Favorite, LocationOn, FavoriteBorderOutlined, Share, MoreVert, Group } from '@material-ui/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import Prompt from '../../../app/common/dialog/Prompt';
import { useToggleClick } from '../../../app/hooks/useToggleClick';
import { useTargetClick } from '../../../app/hooks/useTargetClick';
import formatDate from '../../../app/util/util';
import { modalOpen } from '../../../app/common/modal/modalReducer';
import { deleteLikesEvent, likesEvent } from '../../../app/firestore/firestoreService';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  grid: {
    margin: theme.spacing(0, 0, 3, 0),
  },
  media: {
    width: '100%',
    minHeight: 190,
    paddingTop: '56.25%', // 16:9
  },
  showDetailEventBtn: {
    marginLeft: 'auto',
  },
  eventGroupBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  menu: {
    '& .MuiMenu-paper': theme.palette.background.default,
  },
  location: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

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

export default memo(function EventListItem({ event }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const [expanded, setExpanded] = useToggleClick(false);
  const [dialogOpen, setDialogOpen] = useToggleClick(false);
  const [anchorEl, setAnchorEl] = useTargetClick(null);

  const DialogClose = useCallback(() => {
    setAnchorEl(null);
    setDialogOpen();
  }, [setAnchorEl, setDialogOpen]);

  function modifyEvent() {
    setAnchorEl(null);
    history.push(`/manage/${event.id}`);
  }

  const handleLike = useCallback(async () => {
    if (!currentUserProfile) return dispatch(modalOpen('LoginForm'));
    if (currentUserProfile && currentUserProfile?.likesEvent.indexOf(event.id) !== -1) {
      await deleteLikesEvent(event.id);
    } else {
      await likesEvent(event.id);
    }
  }, [currentUserProfile, dispatch, event.id]);

  return (
    <Grid className={classes.grid} item xs={12}>
      <Prompt open={dialogOpen} setOpen={setDialogOpen} eventId={event.id} />
      <Card className={classes.root} raised={true}>
        <CardHeader
          avatar={
            <Avatar component={Link} to={`/profile/${event.hostUid}`} src={event.hostPhotoURL || null} aria-label='avatar' />
          }
          action={
            currentUserProfile?.id === event.hostUid && (
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
          title={event.title}
          subheader={
            <Typography variant='caption' color='textSecondary'>
              {formatDate(event.date)}
            </Typography>
          }
        />
        <CardActionArea
          component={Link}
          to={{
            pathname: `/img/${event.id}`,
            state: { background: location },
          }}
        >
          <CardMedia
            className={classes.media}
            image={event.thumbnailURL || `/assets/categoryImages/${event.category}.jpg`}
            title={event.title}
          />
        </CardActionArea>
        <CardContent>
          <Box display='flex' alignItems='center'>
            <LocationOn className={classes.icon} />
            <Typography variant='subtitle2' color='textSecondary' display='inline'>
              {event.city.address}
            </Typography>
          </Box>

          <Divider variant='fullWidth' style={{ margin: '8px 0' }} />
          <Typography variant='body1' color='textSecondary' component='p'>
            {event.description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites' onClick={handleLike}>
            {currentUserProfile && currentUserProfile.likesEvent.indexOf(event.id) !== -1 ? (
              <Favorite color='primary' />
            ) : (
              <FavoriteBorderOutlined color='primary' />
            )}
          </IconButton>
          <IconButton aria-label='share'>
            <Share />
          </IconButton>

          <Box className={classes.showDetailEventBtn}>
            <IconButton onClick={setExpanded} aria-expanded={expanded} aria-label='show more'>
              <Group />
            </IconButton>
            <Button color='primary' component={Link} to={`/events/${event.id}`} variant='contained'>
              자세히 보기
            </Button>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Divider variant='middle' style={{ margin: '8px 0' }} />
          <CardActions disableSpacing>
            {event.attendees.map((joinedUser) => (
              <Box className={classes.eventGroupBox} key={joinedUser.id}>
                <Tooltip title={joinedUser.displayName} aria-label={joinedUser.displayName} placement='right' arrow>
                  <Avatar src={joinedUser.photoURL} component={Link} to={`/profile/${joinedUser.id}`} />
                </Tooltip>
              </Box>
            ))}
          </CardActions>
        </Collapse>
      </Card>
    </Grid>
  );
});
