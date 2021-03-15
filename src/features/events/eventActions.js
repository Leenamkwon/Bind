import { dataFromSnapshot, fetchEventsFromFirestore } from '../../app/firestore/firestoreService';
import { asyncActionStart, asyncActionError, asyncActionFinish } from '../../app/async/asyncReducer';
import { CLEAR_EVENTS, CLEAR_SELECTEVENTS, DELETE_EVENT, FETCH_EVENT, MODIFY_EVENT } from './eventConstants';

export function deleteSelectEvent(eventId) {
  return { type: DELETE_EVENT, payload: eventId };
}

export function listenToSelectEvents(event) {
  return { type: MODIFY_EVENT, payload: event };
}

export function clearEvents() {
  return { type: CLEAR_EVENTS };
}

export function clearSelectedEvent() {
  return { type: CLEAR_SELECTEVENTS };
}

export function fetchEvents(filter, startDate, limit, lastDocSnapshot = null) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchEventsFromFirestore(filter, startDate, limit, lastDocSnapshot).get();
      console.log(snapshot.docs);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= 1;
      const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));

      dispatch({ type: FETCH_EVENT, payload: { events, moreEvents, lastVisible } });
    } catch (error) {
      dispatch(asyncActionError(error));
    } finally {
      dispatch(asyncActionFinish());
    }
  };
}
