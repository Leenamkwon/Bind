import { FETCH_CHAT_LIST } from './chatConstants';

const initialState = { chatList: [], chatMessageLog: [] };

export function chatReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CHAT_LIST:
      return { ...state, chatList: payload };
    default:
      return state;
  }
}
