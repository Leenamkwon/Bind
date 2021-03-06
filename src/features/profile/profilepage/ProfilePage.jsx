import React, { useMemo } from 'react';
import { Card, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';

// COMPONENT
import ProfileHeader from './ProfileHeader';
import ProfilePageTab from '../profileTab/ProfilePageTab';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import { listenToSelectUserProfile } from '../profileActions';
import ProfilePageSkeleton from './ProfilePageSkeleton';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentUserProfile, selectUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  // 프로필이 나인지 다른 사람 인지
  const profile = useMemo(() => (currentUserProfile?.id === id ? currentUserProfile : selectUserProfile), [
    currentUserProfile,
    id,
    selectUserProfile,
  ]);

  useFirestoreDoc({
    shouldExcute: currentUser && id !== currentUserProfile?.id,
    query: () => getUserProfile(id),
    data: (profile) => dispatch(listenToSelectUserProfile(profile)),
    deps: [id, dispatch],
  });

  if (!profile && error) return <Redirect to='/error' />;
  if ((loading && !profile && !error) || (!profile && !error)) return <ProfilePageSkeleton />;

  return (
    <Grid container spacing={2}>
      <Card style={{ width: '100%' }} raised={true}>
        <ProfileHeader userIsMe={profile.id === currentUser?.uid} profile={profile} />
        <ProfilePageTab userIsMe={profile.id === currentUser?.uid} profile={profile} />
      </Card>
    </Grid>
  );
}
