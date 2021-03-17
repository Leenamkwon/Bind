import { set } from 'date-fns';
import {
  CLEAR_EVENTS,
  CLEAR_MODIFY_EVENT,
  DELETE_EVENT,
  FETCH_EVENT,
  LISTEN_TO_EVENT_CHAT,
  MODIFY_EVENT,
  RETAIN_STATE,
  SELECT_EVENT,
  SET_FILTER,
  SET_START_DATE,
} from './eventConstants';

const initialState = {
  events: [],
  comments: [],
  moreEvents: false,
  modifyEvent: null,
  selectedEvent: null,
  lastVisible: null,
  filter: 'all',
  startDate: set(new Date(), { hours: 0 }),
  retainState: false,
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EVENT:
      return {
        ...state,
        events: [...state.events, ...payload.events],
        moreEvents: payload.moreEvents,
        lastVisible: payload.lastVisible,
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== payload),
        moreEvents: false,
        lastVisible: null,
      };

    case SELECT_EVENT:
      return {
        ...state,
        selectedEvent: payload,
      };

    case MODIFY_EVENT:
      return {
        ...state,
        modifyEvent: payload,
      };

    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: false,
        lastVisible: null,
      };

    case CLEAR_MODIFY_EVENT:
      return {
        ...state,
        modifyEvent: null,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: payload,
        retainState: false,
        moreEvents: true,
      };

    case SET_START_DATE:
      return {
        ...state,
        startDate: set(payload, { hours: 0 }),
        retainState: false,
        moreEvents: true,
      };

    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };

    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      };
    default:
      return state;
  }
}
