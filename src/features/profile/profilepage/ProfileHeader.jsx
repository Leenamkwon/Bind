import React from 'react';
import { Avatar, Box, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import InsertLinkIcon from '@material-ui/icons/InsertLink';

// COMPONENT
import ButtonComponent from '../../../app/layout/ButtonComponent';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

const useStyle = makeStyles((theme) => ({
  media: {
    height: 400,
  },
  content: {
    width: '100%',
    position: 'absolute',
    top: '-150px',
    left: 0,
  },
  avatar: {
    width: 200,
    height: 200,
    border: `5px solid ${theme.palette.background.paper}`,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  button: {
    alignSelf: 'flex-end',
  },
}));

export default function ProfileHeader() {
  const classes = useStyle();

  return (
    <div>
      <CardMedia className={classes.media} image={'/assets/categoryImages/culture.jpg'} />
      <CardContent style={{ position: 'relative' }}>
        {/* Avatar */}
        <Box display='flex' justifyContent='space-between' alignItems='center' className={classes.content} p={1}>
          <Avatar className={classes.avatar} />
          <div className={classes.button}>
            <ButtonComponent variant='outlined' color='primary' content='수정하기' />
          </div>
        </Box>
        {/* description */}
        <Box mt={6}>
          <Typography variant='h4' component='h6'>
            이남권
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            namkwon12@gamil.com
          </Typography>
        </Box>
        {/* description Form */}
        <Box mt={2}>
          <Typography variant='body1' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia quam consectetur fugit ducimus necessitatibus
            iste commodi, architecto dolorem eveniet explicabo sequi perspiciatis illum rerum. Ipsum nihil accusamus suscipit
            ipsa! Maxime, id rerum. Exercitationem, omnis eos? Illo vero aliquam eius eligendi necessitatibus, eum, accusamus
            libero rem quidem atque odit consequuntur temporibus!
          </Typography>
        </Box>
        <Box mt={3} display='flex'>
          <Box display='flex' alignItems='center' mr={1}>
            <PersonPinCircleIcon className={classes.icon} />{' '}
            <Typography variant='subtitle2' display='inline' color='textSecondary'>
              New York
            </Typography>
          </Box>
          <Box display='flex' alignItems='center' mr={1}>
            <PermContactCalendarIcon className={classes.icon} />{' '}
            <Typography variant='subtitle2' display='inline' color='textSecondary'>
              2019-11-10
            </Typography>
          </Box>
          <Box display='flex' alignItems='center' mr={1}>
            <InsertLinkIcon className={classes.icon} />{' '}
            <Typography variant='subtitle2' display='inline' color='textSecondary'>
              www.naver.com
            </Typography>
          </Box>
        </Box>
        <Box mt={3} display='flex'>
          <Typography variant='subtitle2' display='inline' color='textPrimary'>
            0
          </Typography>
          <Typography variant='subtitle1' display='inline' color='textSecondary'>
            팔로잉
          </Typography>
        </Box>
      </CardContent>
    </div>
  );
}
