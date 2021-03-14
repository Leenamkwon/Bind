import { CLEAR_EVENTS, FETCH_EVENT, RETAIN_STATE } from './eventConstants';

const initialState = {
  events: [],
  comments: [],
  moreEvents: false,
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
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: false,
        lastVisible: null,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    default:
      return state;
  }
}
