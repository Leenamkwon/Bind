import React, { memo, useState } from 'react';
import {
  Card,
  CardHeader,
  Grid,
  Divider,
  CardMedia,
  makeStyles,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

import EventDetailedChat from './EventDetailedChat';
import EventDetailedChatForm from './EventDetailedChatForm';

const useStyles = makeStyles((theme) => ({
  box: {
    width: 200,
  },
  cardMedia: {
    width: '100%',
    objectFit: 'cover',
  },
}));

export default memo(function EventDetailedChatPage({ eventId, currentUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sort, setSort] = useState('recent');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (sorting) => () => {
    if (!sorting) return setAnchorEl(null);
    setSort(sorting);
    setAnchorEl(null);
  };

  return (
    <Grid item style={{ margin: '15px 0 30px 0' }}>
      <Card raised>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <CardHeader
            title={
              <Typography variant='h6' component='h3'>
                {currentUser ? '댓글' : '로그인을 하여 사람들과 소통을 해보세요.'}
              </Typography>
            }
          />

          {currentUser && (
            <CardHeader
              title={
                <>
                  <Button color='inherit' startIcon={<SortIcon />} onClick={handleClick}>
                    정렬 기준
                  </Button>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose(null)}
                  >
                    <MenuItem onClick={handleClose('recent')} selected={sort === 'recent'}>
                      최근 날짜순
                    </MenuItem>
                    <MenuItem onClick={handleClose('oldest')} selected={sort === 'oldest'}>
                      오래된 날짜순
                    </MenuItem>
                  </Menu>
                </>
              }
            />
          )}
        </Box>
        <Divider variant='fullWidth' component='div' />
        {currentUser ? (
          <>
            <EventDetailedChatForm parentId={0} eventId={eventId} />
            <Divider variant='fullWidth' component='div' />
            <EventDetailedChat eventId={eventId} sort={sort} />
          </>
        ) : (
          <EventDetailNoAuth />
        )}
      </Card>
    </Grid>
  );
});

function EventDetailNoAuth() {
  const classes = useStyles();

  return (
    <Box display='flex' justifyContent='center' p={2}>
      <div className={classes.box}>
        <CardMedia className={classes.cardMedia} image='/assets/svgImages/none.svg' component='img' alt='chat' />
      </div>
    </Box>
  );
}
