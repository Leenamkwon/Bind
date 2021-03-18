import React, { useMemo } from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChatPage from './EventDetailedChatPage';
import { listenToSelectEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function EventDetailedPage({ match }) {
  const matches = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const { currentUser } = useSelector((state) => state.auth);
  const { selectedEvent } = useSelector((state) => state.event);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectEvent(event)),
    deps: [dispatch, match.params.id],
  });

  const isHost = useMemo(() => selectedEvent && selectedEvent?.hostUid === currentUser?.uid, [
    currentUser?.uid,
    selectedEvent,
  ]);
  const isGoing = useMemo(() => selectedEvent?.attendees.some((a) => a.id === currentUser?.uid), [
    currentUser?.uid,
    selectedEvent?.attendees,
  ]);

  if (loading || (!selectedEvent && !error)) return <LoadingComponent content='Loading...' />;
  if (error) return <Redirect to='/error' />;

  return (
    <Grid container spacing={2}>
      <Grid item container direction='column' xs={12} sm={8} md={9}>
        <EventDetailedHeader event={selectedEvent} isGoing={isGoing} isHost={isHost} />
        <EventDetailedInfo event={selectedEvent} />
        <EventDetailedChatPage eventId={selectedEvent.id} currentUser={currentUser} />
      </Grid>
      <Grid item xs={12} sm={4} md={3} style={{ marginBottom: matches ? '4em' : 0 }}>
        <EventDetailedSidebar event={selectedEvent} />
      </Grid>
    </Grid>
  );
}
