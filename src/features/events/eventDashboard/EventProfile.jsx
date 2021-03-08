import React from 'react';
import { makeStyles, Card, CardContent, Typography, Avatar, Box, CardActions, Divider } from '@material-ui/core';

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
    border: `2px solid ${theme.palette.primary.main}`,
    margin: '0 auto',
  },
  followingContent: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default function EventProfile() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardActions>
          <Avatar className={classes.avatar} src={null} />
        </CardActions>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5' align='center'>
            Namkwon
          </Typography>
          <Typography variant='subtitle1' color='textSecondary' align='center'>
            namkwon12@naver.com
          </Typography>
        </CardContent>

        <Divider />

        <CardContent className={classes.followingContent}>
          <div>
            <Typography variant='h6' component='h5' display='block'>
              팔로워
            </Typography>
            <Box />
            <Typography variant='subtitle1' display='block' align='center'>
              0
            </Typography>
          </div>
          <div>
            <Typography variant='h6' component='h5' display='block'>
              팔로잉
            </Typography>
            <Box />
            <Typography variant='subtitle1' display='block' align='center'>
              0
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
