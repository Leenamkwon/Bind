import React, { useEffect, memo, useCallback, useRef } from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// COMPONENT
import { listenToUserEvents } from '../../profileActions';
import { CLEAN_UP_EVENT } from '../../profileConstants';
import EventTabItem from '../detailTab/EventTabListItem';
import EventTabListItemSke from './EventTabListItemSke';

export default memo(function EventHostingList({ tabIdx, profile }) {
  const { loading } = useSelector((state) => state.async);
  const { profileEvents, eventLastDocRef, eventMoreEvents } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const initialLoading = useRef(true);

  useEffect(() => {
    dispatch(listenToUserEvents(tabIdx, profile, null, 4)).then((_) => {
      initialLoading.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, tabIdx]);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAN_UP_EVENT });
    };
  }, [dispatch]);

  const nextFetch = useCallback(() => {
    if (eventMoreEvents) {
      dispatch(listenToUserEvents(tabIdx, profile, eventLastDocRef, 4));
    }
  }, [dispatch, eventLastDocRef, eventMoreEvents, profile, tabIdx]);

  if (loading && initialLoading.current) return <EventTabListItemSke />;

  return (
    <Box
      mt={4}
      p={2}
      role='tabpanel'
      id={`vertical-tabpanel-${tabIdx}`}
      aria-labelledby={`vertical-tab-${tabIdx}`}
      style={{ minHeight: 370, overflowY: 'auto' }}
    >
      <InfiniteScroll pageStart={0} loadMore={nextFetch} hasMore={!loading && eventMoreEvents} useWindow={false}>
        <Grid container spacing={4}>
          {profileEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventTabItem event={event} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
      {loading && (
        <Box display='flex' justifyContent='center' mt={1}>
          <CircularProgress size={25} />
        </Box>
      )}
    </Box>
  );
});
