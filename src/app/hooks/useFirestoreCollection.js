import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';

export default function useFirestoreCollection({ query, data, deps, shouldExcute }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubsribe = query().onSnapshot(
      (snapshot) => {
        const EventsData = snapshot.docs?.map(dataFromSnapshot);
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
