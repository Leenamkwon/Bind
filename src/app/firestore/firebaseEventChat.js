import firebase from '../config/firebase';

export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map((e) => Object.assign({}, e[1], { id: e[0] }));
  }
}

//  실시간 댓글
export function addEventChatComment(eventId, values) {
  const user = firebase.auth().currentUser;
  const newComment = {
    uid: user.uid,
    displayName: user.displayName,
    date: Date.now(),
    text: values.comment,
    parentId: values.parentId,
  };

  return firebase.database().ref(`chat/${eventId}`).push(newComment);
}

export function getEventChatRef(eventId) {
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
}
