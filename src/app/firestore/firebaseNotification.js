import firebase from '../config/firebase';

export function getNotificationCollction(currentUser) {
  if (!currentUser) return;
  return firebase.database().ref(`/notification/${currentUser?.uid}`).orderByKey().limitToLast(5);
}

export function checkedNotification(notificationID) {
  const user = firebase.auth().currentUser;
  return firebase.database().ref(`/notification/${user.uid}/${notificationID}`).update({
    isChecked: true,
  });
}

export function deleteNotification(currentUser) {
  if (!currentUser) return;
  return firebase.database().ref(`/notification/${currentUser?.uid}`).remove();
}
