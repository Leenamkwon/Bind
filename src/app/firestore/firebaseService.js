import firebase from '../config/firebase';
import { setUserProfileData } from './firestoreService';

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
    console.log(result);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    throw error;
  }
}

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
