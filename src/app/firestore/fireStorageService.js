import firebase from '../config/firebase';

// 이벤트 썸네일 올리기
export function uploadEventThumbImgStorage(event, file, filename) {
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${event.id}/event_image/${filename}`).put(file);
}

// 이벤트 썸네일 지우기
export function deleteStorageImage(event, filename) {
  const storageRef = firebase.storage().ref(`${event?.id || event}/event_image/${filename}`);
  return storageRef.delete();
}

// 갤러리 사진 올리기
export function uploadToGalleryFirebaseStorage(file, filename) {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/user_image/${filename}`).put(file);
}

// 갤러리 사진 지우기
export function deleteFromGalleryFirebaseStorage(filename) {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${userUid}/user_image/${filename}`).delete();
}

// 파이어스토어 갤러리 사진 지우기
export function deleteGalleryFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return firebase.firestore().collection('users').doc(userUid).collection('photos').doc(photoId).delete();
}
