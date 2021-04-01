import { SIGN_OUT_USER } from '../auth/authConstants';
import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECT_USER_PROFILE,
  LISTEN_TO_USER_PHOTOS,
  LISTEN_TO_USER_EVENT,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  SET_FOLLOW_USER,
  SET_UNFOLLOW_USER,
  CLEAR_FOLLOWINGS,
  RETAIN_EVENT,
  CLEAN_UP_EVENT,
  CLEAN_UP_ALL,
  SELECT_CURRENT_TAB,
} from './profileConstants';

const initialState = {
  currentUserProfile: null,
  selectUserProfile: null,
  photos: [],
  profileEvents: [],
  eventLastDocRef: null,
  eventMoreEvents: false,
  eventRetain: false,
  followers: [],
  followings: [],
  followingUser: false,
  feed: [],
  currentTabIndex: 0,
  retainState: false,
};

export default function profileReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SELECT_CURRENT_TAB:
      return { ...state, currentTabIndex: payload };

    case LISTEN_TO_CURRENT_USER_PROFILE:
      return { ...state, currentUserProfile: payload };

    case SIGN_OUT_USER:
      return initialState;

    case LISTEN_TO_SELECT_USER_PROFILE:
      return { ...state, selectUserProfile: payload };

    case LISTEN_TO_USER_PHOTOS:
      return { ...state, photos: payload };

    case RETAIN_EVENT:
      return { ...state, eventRetain: true };

    case LISTEN_TO_USER_EVENT:
      return {
        ...state,
        profileEvents: [...state.profileEvents, ...payload.events],
        eventLastDocRef: payload.lastVisible,
        eventMoreEvents: payload.moreEvents,
      };

    case LISTEN_TO_FOLLOWERS:
      return { ...state, followers: payload };

    case LISTEN_TO_FOLLOWINGS:
      return { ...state, followings: payload };

    case SET_FOLLOW_USER:
      return { ...state, followingUser: true };

    case SET_UNFOLLOW_USER:
      return { ...state, followingUser: false };

    case CLEAR_FOLLOWINGS:
      return { ...state, followers: [], followings: [] };

    case CLEAN_UP_EVENT:
      return { ...state, retainEvent: false, profileEvents: [], eventLastDocRef: null };

    case CLEAN_UP_ALL:
      return {
        ...state,
        photos: [],
        eventRetain: false,
        profileEvents: [],
        eventLastDocRef: null,
        eventMoreEvents: false,
        followers: [],
        followings: [],
        followingUser: false,
      };

    case 'RETAIN_STATE':
      return { ...state, retainState: true };
    default:
      return state;
  }
}
