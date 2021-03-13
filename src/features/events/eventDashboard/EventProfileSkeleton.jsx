import React from 'react';
import { makeStyles, Card, CardContent, CardActions, Divider } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

// COMPONENT

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  details: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  avatar: {
    width: 150,
    height: 150,
    margin: '0 auto',
  },
}));

export default function EventProfile() {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised={true}>
      <div className={classes.details}>
        <CardActions>
          <Skeleton variant='circle' className={classes.avatar} animation='wave' />
        </CardActions>
        <CardContent className={classes.content}>
          <Skeleton variant='text' animation='wave' />
          <Skeleton variant='text' animation='wave' />
        </CardContent>

        <Divider />

        {/* EVENT FOLLOWING */}
        <Skeleton variant='rect' animation='wave' height={100} />
      </div>
    </Card>
  );
}
