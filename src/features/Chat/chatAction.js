import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../app/async/asyncReducer';
import { getChatList } from '../../app/firestore/firebaseRealChat';
import { dataFromSnapshot } from '../../app/firestore/firestoreService';
import { FETCH_CHAT_LIST } from './chatConstants';

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
