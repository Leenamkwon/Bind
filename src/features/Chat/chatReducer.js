import { SIGN_OUT_USER } from '../auth/authConstants';
import { CHAT_CURRENT_USER, FETCH_CHAT_LIST, FETCH_CHAT_MESSAGE } from './chatConstants';

const initialState = { chatList: [], chatMessageLog: [], anotherUser: null };

export function chatReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CHAT_LIST:
      return { ...state, chatList: payload };

    case FETCH_CHAT_MESSAGE:
      return { ...state, chatMessageLog: payload };

    case SIGN_OUT_USER:
      return initialState;

    case CHAT_CURRENT_USER:
      return { ...state, anotherUser: payload };
    default:
      return state;
  }
}
