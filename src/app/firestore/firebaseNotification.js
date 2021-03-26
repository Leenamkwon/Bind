import firebase from '../config/firebase';

export function getNotificationCollction(currentUser) {
  if (!currentUser) return;
  return firebase.database().ref(`/notification/${currentUser?.uid}`).orderByKey().limitToLast(5);
}
