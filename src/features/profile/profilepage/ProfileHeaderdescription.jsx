import React from 'react';
import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import { PersonPinCircle, InsertLink, PermContactCalendar } from '@material-ui/icons';

// COMPONENT
import ProfileHeaderForm from './ProfileHeaderForm';
import formatDate from '../../../app/util/util';

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
    <div>
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
        <div>
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
                {profile?.links?.map((link) => {
                  if (link.link.length) {
                    return (
                      <Typography variant='subtitle2' display='inline' color='textSecondary' key={link.key}>
                        <Link
                          rel='noopener noreferrer'
                          target='_blank'
                          href={isHttpcontains(link)}
                          style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}
                        >
                          <InsertLink className={classes.icon} />
                          {link['link']}
                        </Link>
                      </Typography>
                    );
                  } else {
                    return null;
                  }
                })}
              </Box>
            )}
          </Box>
        </div>
      )}
    </div>
  );
}
