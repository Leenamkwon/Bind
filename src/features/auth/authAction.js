import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../../app/config/firebase';
import { APP_LOADED } from '../../app/async/asyncReducer';
import { listenToCurrentUserProfile, listenToLikeUserProfile } from '../profile/profileActions';
import { dataFromSnapshot, getEventLikeCollection, getUserProfile } from '../../app/firestore/firestoreService';

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
        // getEventLikeCollection(user).onSnapshot((snapshot) => {
        //   const result = snapshot.docs.map(dataFromSnapshot);
        //   dispatch(listenToLikeUserProfile(result));
        // });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}
