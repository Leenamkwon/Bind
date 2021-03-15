import { set } from 'date-fns';
import {
  CLEAR_EVENTS,
  CLEAR_SELECTEVENTS,
  DELETE_EVENT,
  FETCH_EVENT,
  MODIFY_EVENT,
  RETAIN_STATE,
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
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== payload),
        moreEvents: false,
        lastVisible: null,
      };
    case FETCH_EVENT:
      return {
        ...state,
        events: [...state.events, ...payload.events],
        moreEvents: payload.moreEvents,
        lastVisible: payload.lastVisible,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    case MODIFY_EVENT:
      return {
        ...state,
        modifyEvent: payload,
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
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: false,
        lastVisible: null,
      };
    case CLEAR_SELECTEVENTS:
      return {
        ...state,
        modifyEvent: null,
      };
    default:
      return state;
  }
}
