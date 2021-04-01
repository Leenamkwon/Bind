import { SIGN_OUT_USER } from '../auth/authConstants';
import { FETCH_CHAT_LIST, FETCH_CHAT_MESSAGE } from './chatConstants';

const initialState = { chatList: [], chatMessageLog: [] };

export function chatReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CHAT_LIST:
      return { ...state, chatList: payload };
    case FETCH_CHAT_MESSAGE:
      return { ...state, chatMessageLog: payload };
    case SIGN_OUT_USER:
      return initialState;
    default:
      return state;
  }
}
