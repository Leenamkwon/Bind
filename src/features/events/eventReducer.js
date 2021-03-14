import { CLEAR_EVENTS, CLEAR_SELECTEVENTS, FETCH_EVENT, MODIFY_EVENT, RETAIN_STATE } from './eventConstants';

const initialState = {
  events: [],
  comments: [],
  moreEvents: false,
  modifyEvent: null,
  selectedEvent: null,
  lastVisible: null,
  filter: 'all',
  startDate: new Date(),
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
