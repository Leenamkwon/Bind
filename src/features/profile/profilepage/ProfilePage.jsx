import React from 'react';
import { Card, Grid } from '@material-ui/core';
import ProfileHeader from './ProfileHeader';
import ProfilePageTab from '../profileTab/ProfilePageTab';

export default function ProfilePage() {
  return (
    <Grid container spacing={2}>
      <Card style={{ width: '100%' }} raised={true}>
        <ProfileHeader />
        <ProfilePageTab />
      </Card>
    </Grid>
  );
}
