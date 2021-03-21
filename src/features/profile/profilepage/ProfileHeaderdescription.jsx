import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { PersonPinCircle, InsertLink, PermContactCalendar } from '@material-ui/icons';
import ButtonComponent from '../../../app/layout/ButtonComponent';
import ProfileHeaderForm from './ProfileHeaderForm';

const useStyle = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

export default function ProfileHeaderdescription({ edit, handleEdit, userIsMe }) {
  const classes = useStyle();

  return (
    <>
      <Box mt={7}>
        <Typography variant='h4' component='h6'>
          이남권
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          namkwon12@gamil.com
        </Typography>
      </Box>
      {/* description Form */}
      {edit ? (
        <ProfileHeaderForm handleEdit={handleEdit} />
      ) : (
        <>
          <Box mt={2}>
            <Typography variant='body1' paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, incidunt?
            </Typography>
          </Box>
          <Box mt={3} display='flex'>
            <Box display='flex' alignItems='center' mr={1}>
              <PersonPinCircle className={classes.icon} />{' '}
              <Typography variant='subtitle2' display='inline' color='textSecondary'>
                New York
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' mr={1}>
              <PermContactCalendar className={classes.icon} />{' '}
              <Typography variant='subtitle2' display='inline' color='textSecondary'>
                2019-11-10
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' mr={1}>
              <InsertLink className={classes.icon} />{' '}
              <Typography variant='subtitle2' display='inline' color='textSecondary'>
                www.naver.com
              </Typography>
            </Box>
          </Box>
          <Box mt={3} display='flex' alignItems='center' justifyContent='space-between'>
            <Box>
              <Typography
                variant='subtitle1'
                display='inline'
                color='textPrimary'
                style={{ fontWeight: 500, marginRight: 5 }}
              >
                0
              </Typography>
              <Typography variant='subtitle2' display='inline' color='textSecondary' style={{ marginRight: 10 }}>
                팔로잉
              </Typography>
              <Typography
                variant='subtitle1'
                display='inline'
                color='textPrimary'
                style={{ fontWeight: 500, marginRight: 5 }}
              >
                0
              </Typography>
              <Typography variant='subtitle2' display='inline' color='textSecondary'>
                팔로워
              </Typography>
            </Box>
            {!userIsMe && (
              <Box>
                <ButtonComponent css={{ width: 200 }} variant='contained' color='primary' content='팔로잉' />
                <ButtonComponent css={{ width: 200 }} variant='outlined' content='언팔로우' />
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
}
