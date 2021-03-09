import React from 'react';
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
  CardContent,
  Box,
} from '@material-ui/core';
import { FavoriteBorder, MoreVert, Share } from '@material-ui/icons';
import ButtonComponent from '../../../app/layout/ButtonComponent';

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
    maxHeight: 500,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function EventDetailedHeader() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function menuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function menuClose() {
    setAnchorEl(null);
  }

  return (
    <Grid item>
      <Card raised={true}>
        <CardHeader
          avatar={<Avatar aria-label='recipe'>R</Avatar>}
          action={
            <>
              <IconButton aria-label='settings' onClick={menuOpen}>
                <MoreVert />
              </IconButton>
              <StyledMenu
                className={classes.menu}
                id='event-menu'
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={menuClose}
              >
                <MenuItem onClick={menuClose}>수정하기</MenuItem>
                <Divider variant='fullWidth' />
                <MenuItem onClick={menuClose}>삭제하기</MenuItem>
              </StyledMenu>
            </>
          }
          title={
            <Typography variant='subtitle1' component='h2'>
              Shrimp and Chorizo Paella
            </Typography>
          }
        />
        <CardMedia className={classes.media} image='/assets/categoryImages/play.jpg' title='Paella dish' />
        <Box p={1}>
          <Box display='flex' flexDirection='row-reverse' justifyContent='space-between'>
            <Box display='flex' alignItems='center'>
              <Box>
                <IconButton aria-label='add to favorites'>
                  <FavoriteBorder color='primary' />
                </IconButton>
                2
              </Box>
              <IconButton aria-label='share'>
                <Share />
              </IconButton>
            </Box>
            <Box>
              <ButtonComponent color='primary' variant='outlined' loading={false} content='이벤트 참가하기' />
              <ButtonComponent variant='outlined' loading={false} content='이벤트 나가기' />
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}
