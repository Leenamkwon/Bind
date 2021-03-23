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
    hostedBy: user.displayName || user.email.split('@')[0],
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

// 이벤트 삭제 -- todo: 나중에 유저 데이터 클라우드 기능 이용하여 삭제할 것
export async function deleteEventInFireStore(eventId) {
  const chat = firebase.database().ref(`/chat/${eventId}`);
  try {
    let eventDocRef = await listenToEventFromFirestore(eventId).get();

    // 업로드 사진 삭제
    if (eventDocRef.data().thumbnailURL) {
      await deleteStorageImage(eventId, eventDocRef.data().thumbnailName);
    }

    // 채팅 삭제
    await chat.remove();

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

// 패치 이벤트
export function fetchEventsFromFirestore(filter, startDate, limit, lastDocSnapshot = null) {
  const user = firebase.auth().currentUser;

  const eventsRef = db.collection('events').orderBy('date').startAfter(lastDocSnapshot).limit(limit);

  switch (filter) {
    case 'isGoing':
      return eventsRef.where('attendeeIds', 'array-contains', user.uid).where('date', '>=', startDate);
    case 'isHosting':
      return eventsRef.where('hostUid', '==', user.uid).where('date', '>=', startDate);
    default:
      return eventsRef.where('date', '>=', startDate);
  }
}

// 호스팅 이벤트 참가
export function eventParticipateFirestore(eventId) {
  const user = firebase.auth().currentUser;
  return db
    .collection('events')
    .doc(eventId)
    .update({
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
      attendees: firebase.firestore.FieldValue.arrayUnion({
        displayName: user.displayName,
        id: user.uid,
        photoURL: user.photoURL,
      }),
    });
}

// 이벤트 나감 //
export async function eventOutFirestore(eventId) {
  const user = firebase.auth().currentUser;
  try {
    const selectEvent = await db.collection('events').doc(eventId).get();

    return await db
      .collection('events')
      .doc(eventId)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: selectEvent.data().attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}

// 유저 저장 //
export function setUserProfileData(user) {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      id: user.uid,
      displayName: user.displayName || user.email.split('@')[0],
      email: user.email,
      photoURL: user.photoURL || null,
      providerId: user.providerData[0].providerId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      likesEvent: [],
    });
}

// 유저 참조 ------- //
export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}

// 유저 업데이트 ---------- //
export function userUpdate(values) {
  const { home, description, links } = values;
  const user = firebase.auth().currentUser;

  return db.collection('users').doc(user.uid).update({
    description: description,
    home: home,
    links: links,
  });
}

// 유저 삭제 ---------- //
export async function deleteUser() {
  const user = firebase.auth().currentUser;
  const batch = db.batch();

  try {
    const hostedEvents = await db.collection('events').where('hostUid', '==', user.uid).get();
    const joinedEvents = await db.collection('events').where('attendeeIds', 'array-contains', user.uid).get();

    // 호스팅한 이벤트 삭제
    hostedEvents.forEach((hostEvent) => batch.delete(hostEvent.ref));

    // 참여한 attendees, attendeeIds 삭제
    joinedEvents.forEach((joinedEvent) => {
      const data = joinedEvent.data();
      batch.update(joinedEvent.ref, {
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: data.attendees.filter((attendee) => attendee.id !== user.uid),
      });
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 유저 검색
export async function searchUserFirebase(query) {
  const user = firebase.auth().currentUser;

  if (query === '') return;

  const allUser = await db.collection('users').where('displayName', 'in', [query]).limit(5).get();

  const userMap = allUser.docs.map((user) => {
    const userInfo = user.data();
    return {
      uid: userInfo.id,
      displayName: userInfo.displayName,
      photoURL: userInfo.photoURL,
    };
  });

  const filtering = userMap.filter((item) => item.displayName.indexOf(query) !== -1 && item.uid !== user.uid);
  return filtering;
}

// 프로필 이벤트 패치
export function getUserEventsQuery(activeTab, user, lastDoc = null) {
  let eventsRef = db.collection('events');

  switch (activeTab) {
    case 0: // hosting Events
      return eventsRef.where('hostUid', '==', user.id).orderBy('date').startAfter(lastDoc).limit(4);
    case 1: // attendee events
      return eventsRef.where('attendeeIds', 'array-contains', user.id).orderBy('date').startAfter(lastDoc).limit(4);
    case 2: // likes Events
      return eventsRef.where('likesPeople', 'array-contains', user.id).orderBy('date').startAfter(lastDoc).limit(4);
    default:
      return;
  }
}
