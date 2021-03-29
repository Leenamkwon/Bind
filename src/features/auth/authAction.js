import { LISTEN_TO_ALL_NOTIFICATION, LISTEN_TO_NOTIFICATION, SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../../app/config/firebase';
import { APP_LOADED } from '../../app/async/asyncReducer';
import { listenToCurrentUserProfile } from '../profile/profileActions';
import { dataFromSnapshot, getUserProfile } from '../../app/firestore/firestoreService';

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export function signOutUser() {
  return { type: SIGN_OUT_USER };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        getUserProfile(user.uid).onSnapshot((snapshot) => {
          dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
          dispatch({ type: APP_LOADED });
        });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function listenToNotification(feed) {
  return {
    type: LISTEN_TO_NOTIFICATION,
    payload: feed,
  };
}

export function listenToAllNotification(feed) {
  return {
    type: LISTEN_TO_ALL_NOTIFICATION,
    payload: feed,
  };
}
