import React, { useEffect, useState } from 'react';
import { Grid, Hidden } from '@material-ui/core';

// COMPONENT
import EventFilter from './EventFilter';
import EventList from './EventList';
import EventProfile from './EventProfile';
import EventProfileSkeleton from './EventProfileSkeleton';
import EventListSkeleton from './EventListSkeleton';
import { useSelector } from 'react-redux';

export default function EventDashboard() {
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { initialized } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    setLoadingInitial(true);
  }, []);

  return (
    <Grid container spacing={2}>
      <Hidden mdDown>
        <Grid item lg={3}>
          {loadingInitial && initialized ? (
            <EventProfile currentUserProfile={currentUserProfile} />
          ) : (
            <EventProfileSkeleton />
          )}
        </Grid>
      </Hidden>

      <Grid item sm={7} md={8} lg={5}>
        {loadingInitial && initialized ? <EventList /> : <EventListSkeleton />}
      </Grid>

      <Hidden xsDown>
        <Grid item sm={5} md={4} lg={4}>
          <EventFilter />
        </Grid>
      </Hidden>
    </Grid>
  );
}
