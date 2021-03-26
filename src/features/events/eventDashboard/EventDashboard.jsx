import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Hidden } from '@material-ui/core';

// COMPONENT
import EventFilter from './EventFilter';
import EventList from './EventList';
import EventProfile from './EventProfile';
import EventProfileSkeleton from './EventProfileSkeleton';
import EventListSkeleton from './EventListSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { clearEvents, fetchEvents } from '../eventActions';
import { RETAIN_STATE } from '../eventConstants';

export default function EventDashboard() {
  const dispatch = useDispatch();
  const limit = 2;
  const { events, moreEvents, filter, startDate, lastVisible, retainState } = useSelector((state) => state.event);
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { initialized, loading } = useSelector((state) => state.async);

  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState || loadingInitial) return;
    setLoadingInitial(true);
    dispatch(clearEvents());
    dispatch(fetchEvents(filter, startDate, limit))
      .then(() => {
        setLoadingInitial(false);
      })
      .catch((error) => {
        console.log('event dashboard error', error);
      });

    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, loadingInitial, retainState, startDate]);

  const handleFetchNextEvents = useCallback(() => {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
  }, [dispatch, filter, lastVisible, startDate]);

  return (
    <Grid container spacing={2}>
      <Hidden mdDown>
        <Grid item lg={3}>
          {initialized ? <EventProfile currentUserProfile={currentUserProfile} /> : <EventProfileSkeleton />}
        </Grid>
      </Hidden>

      <Grid item sm={7} md={8} lg={5}>
        {!loadingInitial && initialized ? (
          <EventList events={events} loading={loading} moreEvents={moreEvents} getNextEvents={handleFetchNextEvents} />
        ) : (
          <EventListSkeleton />
        )}
      </Grid>

      <Hidden xsDown>
        <Grid item sm={5} md={4} lg={4}>
          <EventFilter loadingInitial={loadingInitial} />
        </Grid>
      </Hidden>
    </Grid>
  );
}
