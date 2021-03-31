import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';

export default function useFirestoreCollection({ query, data, deps, shouldExcute = true }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExcute) return;
    dispatch(asyncActionStart());
    const unsubsribe = query().onSnapshot(
      (snapshot) => {
        const EventsData = snapshot.docs?.map(dataFromSnapshot);
        console.log(snapshot);
        data(EventsData);
        dispatch(asyncActionFinish());
      },
      (error) => {
        asyncActionError(error);
      }
    );

    return unsubsribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
