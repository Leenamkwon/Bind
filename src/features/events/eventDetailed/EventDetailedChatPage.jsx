import React, { memo } from 'react';
import { Card, CardHeader, Grid, Divider, CardMedia, makeStyles, Box, Typography } from '@material-ui/core';
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

export default memo(function EventDetailedChatPage() {
  return (
    <Grid item style={{ margin: '15px 0 30px 0' }}>
      <Card raised>
        <CardHeader
          title={
            <Typography variant='h6' component='h3'>
              {true ? '댓글' : '로그인을 하여 사람들과 소통을 해보세요'}
            </Typography>
          }
        />
        <Divider variant='fullWidth' component='div' />
        {/* CHAT */}
        <EventDetailedChatForm />
        <Divider variant='fullWidth' component='div' />
        <EventDetailedChat />

        {/* No AUTH */}
        {/* <EventDetailNoAuth /> */}
      </Card>
    </Grid>
  );
});

function EventDetailNoAuth() {
  const classes = useStyles();

  return (
    <Box display='flex' justifyContent='center' p={2}>
      <div className={classes.box}>
        <CardMedia className={classes.cardMedia} image='/assets/svgImages/none.svg' component='img' alt='채팅을 해보세요!' />
      </div>
    </Box>
  );
}
