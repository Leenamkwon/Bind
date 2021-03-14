import React, { memo } from 'react';
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
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Favorite, LocationOn, FavoriteBorderOutlined, Share, MoreVert, Group } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Prompt from '../../../app/common/dialog/Prompt';
import { useToggleClick } from '../../../app/hooks/useToggleClick';
import { useTargetClick } from '../../../app/hooks/useTargetClick';
import formatDate from '../../../app/util/util';
import { useSelector } from 'react-redux';

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
  avatar: {
    backgroundColor: red[500],
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
  const { currentUser } = useSelector((state) => state.auth);
  const [expanded, setExpanded] = useToggleClick(false);
  const [dialogOpen, setDialogOpen] = useToggleClick(false);
  const [anchorEl, setAnchorEl] = useTargetClick(null);

  function DialogClose() {
    setAnchorEl(null);
    setDialogOpen();
  }

  return (
    <Grid className={classes.grid} item xs={12}>
      <Prompt open={dialogOpen} setOpen={setDialogOpen} />
      <Card className={classes.root} raised={true}>
        <CardHeader
          avatar={<Avatar src={event.hostPhotoURL || null} aria-label='recipe' />}
          action={
            currentUser?.uid === event.hostUid && (
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
                  <MenuItem onClick={() => setAnchorEl(null)}>수정하기</MenuItem>
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
        <CardMedia
          className={classes.media}
          image={event.thumbnailURL || `assets/categoryImages/${event.category}.jpg`}
          title='Paella dish'
        />
        <CardContent>
          <Box display='flex' alignItems='center'>
            <LocationOn />
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
          <IconButton aria-label='add to favorites'>
            <FavoriteBorderOutlined color='primary' />
          </IconButton>
          <IconButton aria-label='share'>
            <Share />
          </IconButton>

          <Box className={classes.showDetailEventBtn}>
            <Button color='primary' component={Link} to={`/events/${event.id}`}>
              자세히 보기
            </Button>
            <IconButton onClick={setExpanded} aria-expanded={expanded} aria-label='show more' color='primary'>
              <Group />
            </IconButton>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
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
