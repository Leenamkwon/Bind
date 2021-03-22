import React, { useEffect, memo, useCallback, useRef } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import { listenToUserEvents } from '../../profileActions';
import { CLEAN_UP_EVENT } from '../../profileConstants';
import EventTabItem from '../detailTab/EventTabListItem';

export default memo(function EventAttendeeList({ tabIdx, index, profile }) {
  const dispatch = useDispatch();
  const { retainTabIndex, profileEvents, eventLastDocRef, eventMoreEvents } = useSelector((state) => state.profile);
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;
    dispatch(listenToUserEvents(tabIdx, profile, null));
  }, [dispatch, once, profile, retainTabIndex, tabIdx]);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAN_UP_EVENT });
    };
  }, [dispatch]);

  const nextFetch = useCallback(() => {
    if (eventMoreEvents) {
      dispatch(listenToUserEvents(tabIdx, profile, eventLastDocRef));
    }
  }, [dispatch, eventLastDocRef, eventMoreEvents, profile, tabIdx]);

  return (
    <Box
      mt={4}
      p={2}
      role='tabpanel'
      hidden={tabIdx !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {tabIdx === index && (
        <Grid container spacing={4}>
          {profileEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventTabItem event={event} />
            </Grid>
          ))}
          <button onClick={nextFetch}>more</button>
        </Grid>
      )}
    </Box>
  );
});
