import { SIGN_IN_USER, SIGN_OUT_USER, LISTEN_TO_NOTIFICATION, LISTEN_TO_ALL_NOTIFICATION } from './authConstants';
import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
  authenticated: false,
  currentUser: null,
  prevLocation: null,
  currentLocation: null,
  notification: [],
  AllNotification: [],
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          photoURL: payload.photoURL || null,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId,
          createdAt: payload.metadata.creationTime,
          lastSigninTime: payload.metadata.lastSignInTime,
          uid: payload.uid,
        },
      };
    case SIGN_OUT_USER:
      return { ...state, authenticated: false, currentUser: null, notification: [], AllNotification: [] };

    case LOCATION_CHANGE:
      return { ...state, prevLocation: state.currentLocation, currentLocation: payload.location };

    case LISTEN_TO_NOTIFICATION:
      return { ...state, notification: payload };

    case LISTEN_TO_ALL_NOTIFICATION:
      return { ...state, AllNotification: payload };
    default:
      return { ...state };
  }
}
