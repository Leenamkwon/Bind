import React from 'react';
import { Card, Grid } from '@material-ui/core';
import ProfileHeader from './ProfileHeader';

export default function ProfilePage() {
  return (
    <Grid container spacing={2}>
      <Card style={{ width: '100%' }}>
        <ProfileHeader />
        <div>dasda</div>
      </Card>
    </Grid>
  );
}
