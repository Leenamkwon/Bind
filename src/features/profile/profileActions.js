import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../app/async/asyncReducer';
import { dataFromSnapshot, getUserEventsQuery } from '../../app/firestore/firestoreService';
import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECT_USER_PROFILE,
  LISTEN_TO_USER_PHOTOS,
  LISTEN_TO_USER_EVENT,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  SET_FOLLOW_USER,
  SET_UNFOLLOW_USER,
} from './profileConstants';

export function listenToCurrentUserProfile(profile) {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
}

export function listenToSelectUserProfile(profile) {
  return {
    type: LISTEN_TO_SELECT_USER_PROFILE,
    payload: profile,
  };
}

export function listenToUserPhotos(photos) {
  return {
    type: LISTEN_TO_USER_PHOTOS,
    payload: photos,
  };
}

export function listenToUserEvents(activeTab, user, lastDoc, limit) {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const snapshot = await getUserEventsQuery(activeTab, user, lastDoc, limit).get();

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= 1;
      const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({ type: LISTEN_TO_USER_EVENT, payload: { events, moreEvents, lastVisible } });
    } catch (error) {
      dispatch(asyncActionError(error));
    } finally {
      dispatch(asyncActionFinish());
    }
  };
}

export function listenToFollowers(followers) {
  return {
    type: LISTEN_TO_FOLLOWERS,
    payload: followers,
  };
}

export function listenToFollowings(followings) {
  return {
    type: LISTEN_TO_FOLLOWINGS,
    payload: followings,
  };
}

export function setFollowUser() {
  return {
    type: SET_FOLLOW_USER,
  };
}

export function setUnFollowUser() {
  return {
    type: SET_UNFOLLOW_USER,
  };
}
