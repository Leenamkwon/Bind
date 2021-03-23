import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';

export default function useFirestoreDoc({ query, data, deps, shouldExcute = true }) {
  const dispatch = useDispatch();

  console.log(shouldExcute);

  useEffect(() => {
    if (!shouldExcute) return;
    dispatch(asyncActionStart());
    const unsubsribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          return dispatch(asyncActionError({ code: 'not-found', message: '404 Could not find document' }));
        } else {
          const selectEventData = dataFromSnapshot(snapshot);
          data(selectEventData);
          dispatch(asyncActionFinish());
        }
      },
      (error) => {
        dispatch(asyncActionError(error));
      }
    );

    return () => {
      unsubsribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
