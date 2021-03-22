import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

export default function ImgMediaCard({ event }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='200'
          image={event.thumbnailURL || `/assets/categoryImages/${event.category}.jpg`}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {event.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
