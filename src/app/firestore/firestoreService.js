import firebase from '../config/firebase';
import { deleteStorageImage } from './fireStorageService';

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

// 이벤트 추가
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

// 단일 이벤트 패치
export function listenToEventFromFirestore(eventId) {
  return db.collection('events').doc(eventId);
}

// 이벤트 썸네일 업데이트
export function updateEventThumbImg(event, file) {
  return db.collection('events').doc(event.id).update(file);
}

// 이벤트 업데이트
export function updateEventInFireStore(event) {
  return db.collection('events').doc(event.id).update(event);
}

// 이벤트 삭제
export async function deleteEventInFireStore(eventId) {
  try {
    let eventDocRef = await listenToEventFromFirestore(eventId).get();
    if (eventDocRef.data().thumbnailURL) {
      await deleteStorageImage(eventId, eventDocRef.data().thumbnailName);
    }
    return db.collection('events').doc(eventId).delete();
  } catch (error) {
    throw error;
  }
}

// 좋아요 추가
export async function likesEvent(eventId) {
  const user = firebase.auth().currentUser;
  await db
    .collection('events')
    .doc(eventId)
    .update({
      likes: firebase.firestore.FieldValue.increment(1),
      likesPeople: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
  return await db
    .collection('users')
    .doc(user.uid)
    .update({ likesEvent: firebase.firestore.FieldValue.arrayUnion(eventId) });
}

// 좋아요 삭제
export async function deleteLikesEvent(eventId) {
  const user = firebase.auth().currentUser;
  await db
    .collection('events')
    .doc(eventId)
    .update({
      likes: firebase.firestore.FieldValue.increment(-1),
      likesPeople: firebase.firestore.FieldValue.arrayRemove(user.uid),
    });
  return await db
    .collection('users')
    .doc(user.uid)
    .update({ likesEvent: firebase.firestore.FieldValue.arrayRemove(eventId) });
}

// FETCH EVENT COLLECTION
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
      likesEvent: [],
    });
}

// 유저 참조 //
export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}
