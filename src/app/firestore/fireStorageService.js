import firebase from '../config/firebase';

export function uploadEventThumbImgStorage(event, file, filename) {
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${event.id}/event_image/${filename}`).put(file);
}

export function deleteStorageImage(event) {
  const storageRef = firebase.storage().ref(event.id);
  return storageRef.delete();
}
