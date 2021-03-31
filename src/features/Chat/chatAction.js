import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../app/async/asyncReducer';
import { getChatList } from '../../app/firestore/firebaseRealChat';
import { dataFromSnapshot } from '../../app/firestore/firestoreService';
import { FETCH_CHAT_LIST, FETCH_CHAT_MESSAGE } from './chatConstants';

export function fetchChatList() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await getChatList().get();
      const chatList = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({ type: FETCH_CHAT_LIST, payload: chatList });
    } catch (error) {
      dispatch(asyncActionError(error));
    } finally {
      dispatch(asyncActionFinish());
    }
  };
}

export function fetchChatList2(chatList) {
  return { type: FETCH_CHAT_LIST, payload: chatList };
}

export function fetchChatMessageList(chatMessageList) {
  return { type: FETCH_CHAT_MESSAGE, payload: chatMessageList };
}
