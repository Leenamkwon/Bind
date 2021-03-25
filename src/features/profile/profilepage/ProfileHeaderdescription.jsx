import React from 'react';
import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import { PersonPinCircle, InsertLink, PermContactCalendar } from '@material-ui/icons';
import ButtonComponent from '../../../app/layout/ButtonComponent';
import ProfileHeaderForm from './ProfileHeaderForm';
import formatDate, { extractURL } from '../../../app/util/util';

const useStyle = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));

export default function ProfileHeaderdescription({ edit, handleEdit, userIsMe, profile }) {
  const classes = useStyle();

  function isHttpcontains(link) {
    return link['link'].includes('http') ? link['link'] : `https://${link['link']}`;
  }

  return (
    <>
      <Box mt={7}>
        <Typography variant='h4' component='h6'>
          {profile.displayName || profile.email.split('@')[0]}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {profile.email}
        </Typography>
      </Box>
      {/* description Form */}
      {edit && userIsMe ? (
        <ProfileHeaderForm handleEdit={handleEdit} profile={profile} />
      ) : (
        <>
          <Box mt={2}>
            <Typography variant='body1' paragraph>
              {profile?.description ?? ''}
            </Typography>
          </Box>
          <Box mt={3} display='flex'>
            {profile?.home && (
              <Box display='flex' alignItems='center' mr={1}>
                <PersonPinCircle className={classes.icon} />
                <Typography variant='subtitle2' display='inline' color='textSecondary'>
                  {profile?.home ?? ''}
                </Typography>
              </Box>
            )}
            <Box display='flex' alignItems='center' mr={1}>
              <PermContactCalendar className={classes.icon} />
              <Typography variant='subtitle2' display='inline' color='textSecondary'>
                {formatDate(profile.createdAt, 'yyyy년 MM월 dd일')}
              </Typography>
            </Box>
            {profile?.links && (
              <Box display='flex' alignItems='center' mr={1}>
                <InsertLink className={classes.icon} />
                <Typography variant='subtitle2' display='inline' color='textSecondary'>
                  {profile?.links?.map((link) => (
                    <Link
                      rel='noopener noreferrer'
                      target='_blank'
                      href={isHttpcontains(link)}
                      key={link.key}
                      style={{ marginRight: 8 }}
                    >
                      {extractURL(link['link'])}
                    </Link>
                  ))}
                </Typography>
              </Box>
            )}
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
