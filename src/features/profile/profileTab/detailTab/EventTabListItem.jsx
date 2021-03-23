import React, { memo } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, CardHeader, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import formatDate from '../../../../app/util/util';

export default memo(function ImgMediaCard({ event }) {
  return (
    <Card raised={true}>
      <CardActionArea component={Link} to={`/events/${event.id}`}>
        <CardMedia
          component='img'
          alt={event.title}
          height='200'
          image={event.thumbnailURL || `/assets/categoryImages/${event.category}.jpg`}
          title={event.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='h2'>
            {event.title}
          </Typography>

          <Typography variant='body2' color='textSecondary' component='p'>
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardHeader
        avatar={<Avatar component={Link} to={`/profile/${event.hostUid}`} src={event.hostPhotoURL || null} />}
        subheader={
          <>
            {' '}
            <Typography variant='body2' color='textSecondary' component='p' gutterBottom>
              {formatDate(event.date)}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {event.city.address}
            </Typography>{' '}
          </>
        }
      />
    </Card>
  );
});
