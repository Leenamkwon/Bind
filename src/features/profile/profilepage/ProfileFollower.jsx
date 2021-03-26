import React, { useState, memo, useEffect, useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import ButtonComponent from '../../../app/layout/ButtonComponent';
import { followUser, getFollowingUserDoc, unFollowUser } from '../../../app/firestore/firestoreService';
import { setFollowUser, setUnFollowUser } from '../profileActions';
import { useSnackbar } from 'notistack';
import { CLEAR_FOLLOWINGS } from '../profileConstants';

export default memo(function ProfileFollower({ profile, userIsMe }) {
  const [loading, setLoading] = useState(false);
  const { followingUser } = useSelector((state) => state.profile);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userIsMe) return;
    setLoading(true);
    async function fetchFollowingData() {
      try {
        const followingDoc = await getFollowingUserDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }

    fetchFollowingData().then(() => setLoading(false));

    return () => dispatch({ type: CLEAR_FOLLOWINGS });
  }, [dispatch, enqueueSnackbar, profile.id, userIsMe]);

  const handleFollowUser = useCallback(async () => {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [dispatch, enqueueSnackbar, profile]);

  const handleUnFollowUser = useCallback(async () => {
    setLoading(true);
    try {
      await unFollowUser(profile);
      dispatch(setUnFollowUser());
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [dispatch, enqueueSnackbar, profile]);

  return (
    <Box mt={2} display='flex' alignItems='center' justifyContent='space-between'>
      <Box>
        <Typography variant='subtitle1' display='inline' color='textPrimary' style={{ fontWeight: 500, marginRight: 5 }}>
          0
        </Typography>
        <Typography variant='subtitle2' display='inline' color='textSecondary' style={{ marginRight: 10 }}>
          팔로잉
        </Typography>
        <Typography variant='subtitle1' display='inline' color='textPrimary' style={{ fontWeight: 500, marginRight: 5 }}>
          {profile?.followerCount ?? 0}
        </Typography>
        <Typography variant='subtitle2' display='inline' color='textSecondary'>
          팔로워
        </Typography>
      </Box>
      {!userIsMe && (
        <Box>
          {followingUser ? (
            <ButtonComponent
              onClick={handleUnFollowUser}
              css={{ width: 200 }}
              variant='outlined'
              content='언팔로우'
              disabled={loading}
            />
          ) : (
            <ButtonComponent
              onClick={handleFollowUser}
              css={{ width: 200 }}
              variant='contained'
              content='팔로잉'
              disabled={loading}
            />
          )}
        </Box>
      )}
    </Box>
  );
});
