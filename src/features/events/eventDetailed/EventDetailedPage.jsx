import React from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChatPage from './EventDetailedChatPage';

export default function EventDetailedPage() {
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Grid container spacing={2}>
      <Grid item container direction='column' xs={12} sm={8} md={9}>
        <EventDetailedHeader />
        <EventDetailedInfo />
        <EventDetailedChatPage />
      </Grid>
      <Grid item xs={12} sm={4} md={3} style={{ marginBottom: matches ? '4em' : 0 }}>
        <EventDetailedSidebar />
      </Grid>
    </Grid>
  );
}
