import React, { memo } from 'react';
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
import { FavoriteBorder, MoreVert, Share } from '@material-ui/icons';
import ButtonComponent from '../../../app/layout/ButtonComponent';
import Prompt from '../../../app/common/dialog/Prompt';
import { useTargetClick } from '../../../app/hooks/useTargetClick';
import { useToggleClick } from '../../../app/hooks/useToggleClick';

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

export default memo(function EventDetailedHeader() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useTargetClick(null);
  const [dialogOpen, setDialogOpen] = useToggleClick(false);

  function promptClose() {
    setAnchorEl(null);
    setDialogOpen(true);
  }

  return (
    <Grid container>
      <Prompt open={dialogOpen} setOpen={setDialogOpen} />
      <Grid item xs={12}>
        <Card raised={true}>
          <CardHeader
            avatar={<Avatar aria-label='recipe'>R</Avatar>}
            action={
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
                  <MenuItem onClick={promptClose}>삭제하기</MenuItem>
                </StyledMenu>
              </>
            }
            title={
              <Typography variant='subtitle1' component='h2'>
                Shrimp and Chorizo Paella
              </Typography>
            }
          />
          <CardMedia className={classes.media} image='/assets/categoryImages/culture.jpg' title='Paella dish' />
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
    </Grid>
  );
});
