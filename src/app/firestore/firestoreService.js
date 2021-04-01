import firebase from '../config/firebase';
import { deleteStorageImage } from './fireStorageService';
import { eventChatPhotoIconUpdate } from './firebaseEventChat';
import { realChatPhotoIconUpdate } from './firebaseRealChat';
import { NotificationPhotoUpdate } from './firebaseNotification';

const db = firebase.firestore();

// 유틸 함수 시작 //
export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return;

  const data = snapshot.data();
  for (let key in data) {
    if (data[key] instanceof firebase.firestore.Timestamp) {
      data[key] = data[key].toDate();
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

// 모든 이벤트 가져오기
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

// 단일 이벤트 가져오기
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
      displayName: user?.displayName || user.email.split('@')[0],
      email: user.email,
      photoURL: user.photoURL || null,
      providerId: user.providerData[0].providerId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      likesEvent: [],
      backgroundURL: null,
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

// 프로필 이벤트 가져오기
export function getUserEventsQuery(activeTab, user, lastDoc = null, limit) {
  let eventsRef = db.collection('events');

  switch (activeTab) {
    case 0: // hosting Events
      return eventsRef.where('hostUid', '==', user.id).orderBy('date').startAfter(lastDoc).limit(limit);
    case 1: // attendee events
      return eventsRef.where('attendeeIds', 'array-contains', user.id).orderBy('date').startAfter(lastDoc).limit(limit);
    case 2: // likes Events
      return eventsRef.where('likesPeople', 'array-contains', user.id).orderBy('date').startAfter(lastDoc).limit(limit);
    default:
      return;
  }
}

// 갤러리 이미지 업로드
export async function updateUserGalleryPhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection('users').doc(user.uid);
  try {
    const userDoc = await userDocRef.get();

    if (!userDoc.data().photoURL) {
      // await userDocRef.update({ photoURL: downloadURL });
      // await user.updateProfile({ photoURL: downloadURL });
      await userProfilePhotoUpdate(downloadURL);
    }

    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
}

// 갤러리 이미지 가져오기
export function getUserPhotos(userUid) {
  return db.collection('users').doc(userUid).collection('photos');
}

// 갤러리 이미지 개수 제한해서 가져오기
export function getUserPhotosLimit(userUid) {
  return db.collection('users').doc(userUid).collection('photos').orderBy('createdAt').limitToLast(9);
}

// 프로파일 배경화면 업데이트
export function userBackgroundUpdate(values) {
  const user = firebase.auth().currentUser;

  return db.collection('users').doc(user.uid).update({
    backgroundURL: values,
  });
}

// 메인 프로파일 업데이트 //
export async function userProfilePhotoUpdate(url) {
  const user = firebase.auth().currentUser;
  const eventDocQuery = db.collection('events').where('attendeeIds', 'array-contains', user.uid);
  const eventChatQuery = db.collection('chat').where('chatUserIds', 'array-contains', user.uid);
  const batch = db.batch();

  try {
    batch.update(db.collection('users').doc(user.uid), {
      photoURL: url,
    });

    // 이벤트, 이벤트 참여 아이콘 사진 업데이트
    const eventsQuerySnap = await eventDocQuery.get();
    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i];

      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: url,
        });
      }

      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.map((attendee) => {
          if (attendee.id === user.uid) {
            return { ...attendee, photoURL: url };
          }
          return attendee;
        }),
      });
    }
    // 실시간 채팅 아바타 업데이트
    const realChatData = await eventChatQuery.get();
    for (let i = 0; i < realChatData.docs.length; i++) {
      let chatDoc = realChatData.docs[i];

      batch.update(chatDoc.ref, {
        chatUsers: chatDoc.data().chatUsers.map((chatUser) => {
          if (chatUser.id === user.uid) {
            return { ...chatUser, photoURL: url };
          }
          return chatUser;
        }),
      });
    }

    // 알림 아바타 업데이트
    await NotificationPhotoUpdate({ photoURL: url });

    // 리얼 채팅 아바타 업데이트
    await realChatPhotoIconUpdate('message', { photoURL: url });

    // 채팅 아바타 업데이트
    await eventChatPhotoIconUpdate('chat', { photoURL: url });

    await batch.commit();

    return await user.updateProfile({
      photoURL: url,
    });
  } catch (error) {
    throw error;
  }
}

// 팔로워 정보 모두 가져오기
export function getFollowerscollection(profileId) {
  return db.collection('following').doc(profileId).collection('userFollowers');
}

// 팔로잉 정보 모두 가져오기
export function getFollowingcollection(profileId) {
  return db.collection('following').doc(profileId).collection('userFollowing');
}

// 팔로우한 유저 1명 정보 가져오기
export async function getFollowingUserDoc(profileId) {
  const userUid = firebase.auth().currentUser.uid;
  return db.collection('following').doc(userUid).collection('userFollowing').doc(profileId).get();
}

// 유저 팔로워
export async function followUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.set(db.collection('following').doc(user.uid).collection('userFollowing').doc(profile.id), {
      displayName: profile.displayName,
      photoURL: profile.photoURL,
      uid: profile.id,
    });

    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

// 유저 언팔로우
export async function unFollowUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.delete(db.collection('following').doc(user.uid).collection('userFollowing').doc(profile.id));

    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
}
