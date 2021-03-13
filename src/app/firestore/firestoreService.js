import firebase from '../config/firebase';

const db = firebase.firestore();

// Util
export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return;

  const data = snapshot.data();
  for (let key in data) {
    if (data[key] instanceof firebase.firestore.Timestamp) {
      data[key] = data[key].toDate();
      break;
    }
  }

  return {
    id: snapshot.id,
    ...data,
  };
}

// 유저 저장
export function setUserProfileData(user) {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      providerId: user.providerData[0].providerId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

// 유저 참조
export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}
