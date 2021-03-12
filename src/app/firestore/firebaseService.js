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
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {}
}

export function findPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}
