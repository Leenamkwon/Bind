import firebase from '../config/firebase';
import { deleteNotification } from './firebaseNotification';
import { realChatPhotoIconUpdate } from './firebaseRealChat';
import { setUserProfileData } from './firestoreService';

const db = firebase.firestore();

export function signInWithEmail(creds) {
  return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerInFirebase(creds) {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password);
    await result.user.updateProfile({
      displayName: creds.displayName,
    });
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}

export async function socialLoginFirebase(selectProvider) {
  let provider;
  if (selectProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  if (selectProvider === 'github') {
    provider = new firebase.auth.GithubAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    throw error;
  }
}

// 비밀번호 재설정 보내기
export function findPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}

// 사용자 재인증
export async function reauthFirebase(creds) {
  const user = firebase.auth().currentUser;
  const isCreds = firebase.auth.EmailAuthProvider.credential(creds.email, creds.password);

  try {
    return await user.reauthenticateWithCredential(isCreds);
  } catch (error) {
    throw error;
  }
}

// 사용자 이메일 및 비밀번호 변경
export async function emailAndPasswordChange(creds) {
  const user = firebase.auth().currentUser;
  const userDocRef = firebase.firestore().collection('users').doc(user.uid);
  const promise = [];

  if (creds.email) {
    promise.push(user.updateEmail(creds.email));
    promise.push(userDocRef.update({ email: creds.email }));
  } else if (creds.password) {
    promise.push(user.updatePassword(creds.password));
  }

  try {
    return await Promise.all(promise);
  } catch (error) {
    throw error;
  }
}

// 회원 탈퇴
export async function userBye() {
  const user = firebase.auth().currentUser;
  const batch = firebase.firestore().batch();
  const promise = [];

  const userDocRef = await db.collection('events').where('hostUid', '==', user.uid).get();
  const userParticipateEvents = await db.collection('events').where('attendeeIds', 'array-contains', user.uid).get();
  const photos = await db.collection('users').doc(user.uid).collection('photos').get();
  const userFollowingRef = db.collection('following').doc(user.uid).collection('userFollowing');
  const userFollowerRef = db.collection('following').doc(user.uid).collection('userFollowers');

  try {
    // step 01. 이벤트, 스토리지 이미지 파일 전부 삭제
    userDocRef.docs.forEach(async (docRef) => {
      if (!docRef.exists) return;

      batch.delete(docRef);
    });

    await Promise.all(promise);

    // step 02. 모든 참여한 이벤트에서 유저 자신 삭제
    userParticipateEvents.docs.forEach((joinedUserDocRef) => {
      if (!joinedUserDocRef.exists) return;

      const event = joinedUserDocRef.data();

      batch.update(joinedUserDocRef, {
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: event.attendees.filter((attendee) => attendee.id !== user.uid),
      });
    });

    // step 04. 팔로잉 팔로워 삭제
    const userFollowingSnap = await userFollowerRef.get();
    userFollowingSnap.docs.forEach((docRef) => {
      const followingDocRef = db.collection('following').doc(docRef.id).collection('userFollowing').doc(user.uid);

      batch.update(db.collection('users').doc(docRef.id), {
        followingCount: firebase.firestore.FieldValue.increment(-1),
      });

      batch.delete(followingDocRef);
    });

    const userFollowerSnap = await userFollowingRef.get();
    userFollowerSnap.docs.forEach((docRef) => {
      const followerDocRef = db.collection('following').doc(docRef.id).collection('userFollowers').doc(user.uid);

      batch.update(db.collection('users').doc(docRef.id), {
        followerCount: firebase.firestore.FieldValue.increment(-1),
      });

      batch.delete(followerDocRef);
    });

    batch.delete(db.collection('following').doc(user.uid));

    // step 05. 호스팅 이미지 모두 삭제
    await firebase
      .storage()
      .ref(`${user.uid}/user_image/`)
      .listAll()
      .then((res) => {
        res.items.forEach(function (itemRef) {
          itemRef.delete();
        });
      })
      .catch((error) => {
        throw error;
      });

    // 유저 알림 삭제
    await deleteNotification(user);

    // 채팅 삭제
    await realChatPhotoIconUpdate('message', { photoURL: null, displayName: '알 수 없음', uid: null });

    // step 06. 유저 파이어 스토어 삭제
    if (!photos.empty) photos.forEach((photoRef) => batch.delete(photoRef));

    batch.delete(db.collection('users').doc(user.uid));

    await batch.commit();

    // stop 07. 유저 Auth 삭제
    return await firebase.auth().currentUser.delete();
  } catch (error) {
    throw error;
  }
}
