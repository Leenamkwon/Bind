import React from 'react';
import { Avatar, Box, CardContent, CardMedia, makeStyles } from '@material-ui/core';

// COMPONENT
import ButtonComponent from '../../../app/layout/ButtonComponent';
import ProfileHeaderdescription from './ProfileHeaderdescription';
import { useTargetClick } from '../../../app/hooks/useTargetClick';

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

  button: {
    alignSelf: 'flex-end',
  },
}));

export default function ProfileHeader({ userIsMe, profile }) {
  const classes = useStyle();
  const [edit, handleEdit] = useTargetClick(false);

  return (
    <>
      <CardMedia className={classes.media} image={'/assets/categoryImages/culture.jpg'} />
      <CardContent style={{ position: 'relative' }}>
        {/* Avatar */}
        <Box display='flex' justifyContent='space-between' alignItems='center' className={classes.content} p={1}>
          <Avatar className={classes.avatar} src={profile.photoURL || null} />
          <div className={classes.button}>
            {!edit && userIsMe && (
              <ButtonComponent variant='outlined' color='primary' content='수정하기' onClick={() => handleEdit(true)} />
            )}
          </div>
        </Box>
        {/* description */}
        <ProfileHeaderdescription edit={edit} handleEdit={handleEdit} userIsMe={userIsMe} profile={profile} />
      </CardContent>
    </>
  );
}
