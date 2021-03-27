import { dataFromSnapshot, fetchEventsFromFirestore } from '../../app/firestore/firestoreService';
import { asyncActionStart, asyncActionError, asyncActionFinish } from '../../app/async/asyncReducer';
import {
  CLEAR_EVENTS,
  CLEAR_EVENT_CHAT,
  CLEAR_MODIFY_EVENT,
  DELETE_EVENT,
  FETCH_EVENT,
  LISTEN_TO_EVENT_CHAT,
  MODIFY_EVENT,
  SELECT_EVENT,
  SET_FILTER,
  SET_START_DATE,
} from './eventConstants';

export function fetchEvents(filter, startDate, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchEventsFromFirestore(filter, startDate, limit, lastDocSnapshot).get();

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= limit;
      const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));

      dispatch({ type: FETCH_EVENT, payload: { events, moreEvents, lastVisible } });
      return lastVisible;
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError(error));
    } finally {
      dispatch(asyncActionFinish());
    }
  };
}

export function deleteSelectEvent(eventId) {
  return { type: DELETE_EVENT, payload: eventId };
}

export function listenToModifyEvent(event) {
  return { type: MODIFY_EVENT, payload: event };
}

export function clearModifyEvent() {
  return { type: CLEAR_MODIFY_EVENT };
}

export function clearEvents() {
  return { type: CLEAR_EVENTS };
}

export function listenToSelectEvent(selectEvt) {
  return { type: SELECT_EVENT, payload: selectEvt };
}

// 필터 액션 ------------- //
export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearEvents());
    dispatch({ type: SET_FILTER, payload: value });
  };
}

export function setStartDate(date) {
  return function (dispatch) {
    dispatch(clearEvents());
    dispatch({ type: SET_START_DATE, payload: date });
  };
}

// 이벤트 채팅
export function listenToEventChat(comments) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments || [],
  };
}

// 이벤트 채팅 대청소
export function clearEventChat() {
  return {
    type: CLEAR_EVENT_CHAT,
  };
}
