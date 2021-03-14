import firebase from '../config/firebase';

const db = firebase.firestore();

// 유틸 함수 시작 //
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
// 유틸 함수 끝 //

// 이벤트 CRUD //
export function addEventToFirestore(event) {
  const user = firebase.auth().currentUser;
  return db.collection('events').add({
    ...event,
    likesNumber: 0,
    thumbnailURL: null,
    hostedBy: user.displayName,
    hostUid: user.uid,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
}

export function updateEventThumbImg(event, imgURL) {
  return db.collection('events').doc(event.id).update({ thumbnailURL: imgURL });
}

export function updateEventInFireStore(event) {
  return db.collection('events').doc(event.id).update(event);
}

export function deleteEventInFireStore(id) {
  return db.collection('events').doc(id).delete();
}
// 이벤트 CRUD 끝 //

// 유저 저장 //
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

// 유저 참조 //
export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}

// FETCH EVENT //
export function fetchEventsFromFirestore(filter, startDate, limit, lastDocSnapshot = null) {
  const user = firebase.auth().currentUser;

  const eventsRef = db.collection('events').orderBy('date').startAfter(lastDocSnapshot).limit(limit);

  switch (filter) {
    case 'isGoing':
      return eventsRef.where('attendeeIds', 'array-contains', user.uid).where('date', '>=', startDate);
    case 'isHosting':
      return eventsRef.where('hostUid', '==', user.uid).where('date', '>=', startDate);
    default:
      return eventsRef.where('date', '<=', startDate);
  }
}
