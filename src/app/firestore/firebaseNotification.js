import firebase from '../config/firebase';

export function getNotificationCollction(currentUser) {
  if (!currentUser) return;
  return firebase.database().ref(`/notification/${currentUser?.uid}`).orderByKey().limitToLast(5);
}

export function getNotificationCollctionAll(currentUser) {
  if (!currentUser) return;
  return firebase.database().ref(`/notification/${currentUser?.uid}`).orderByKey();
}

export function checkedNotification(notificationID) {
  const user = firebase.auth().currentUser;
  return firebase.database().ref(`/notification/${user.uid}/${notificationID}`).update({
    isChecked: true,
  });
}

export function deleteNotification(currentUser) {
  if (!currentUser) return;
  return firebase.database().ref(`notification/${currentUser?.uid}`).remove();
}

export async function NotificationPhotoUpdate(photoData) {
  try {
    const user = firebase.auth().currentUser;
    const notiRef = firebase.database().ref('notification');
    const notiSnap = await notiRef.get();

    if (notiSnap.exists()) {
      const rootId = Object.entries(notiSnap.val()).map((evt) => evt[0]);

      if (rootId.length) {
        for (let val of rootId) {
          const childRef = notiRef.child(val);
          const data = await childRef.get();
          const key = Object.keys(data.val());

          for (let val of key) {
            const test = childRef.child(val);
            const data = await test.get();

            if (data.val().userUid === user.uid) {
              test.ref.update(photoData);
            }
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
}
