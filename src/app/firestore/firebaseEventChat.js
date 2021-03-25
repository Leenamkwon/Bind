import firebase from '../config/firebase';

export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map((e) => Object.assign({}, e[1], { id: e[0] }));
  }
}

//  실시간 댓글 추가하기
export function addEventChatComment(eventId, values) {
  const user = firebase.auth().currentUser;
  const newComment = {
    uid: user.uid,
    displayName: user.displayName || user.email.split('@')[0],
    photoURL: user.photoURL,
    date: Date.now(),
    text: values.comment,
    parentId: values.parentId,
    isUpdate: false,
  };

  return firebase.database().ref(`chat/${eventId}`).push(newComment);
}

// 댓글 가져오기
export function getEventChatRef(eventId) {
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
}

// 댓글 수정하기
export async function updateChatComment(eventId, commentId, text) {
  const chatRef = firebase.database().ref(`chat/${eventId}/${commentId}`);
  return chatRef.update({ text: text, isUpdate: true });
}

// 댓글 지우기
export async function deleteChatComment(eventId, comment) {
  const realTimeRef = firebase.database().ref();

  try {
    if (comment.childNodes.length > 0) {
      const promise = [];
      comment.childNodes.forEach((a) => promise.push(realTimeRef.child(`chat/${eventId}/${a.id}`).remove()));
      promise.push(firebase.database().ref(`chat/${eventId}/${comment.id}`).remove());
      return await Promise.all(promise);
    }

    return await firebase.database().ref(`chat/${eventId}/${comment.id}`).remove();
  } catch (error) {
    throw error;
  }
}

export async function eventChatPhotoIconUpdate(entryName, updateData) {
  const userUid = firebase.auth().currentUser.uid;
  const chatRef = firebase.database().ref(entryName);

  try {
    const chatSnap = await chatRef.get();
    const rootId = Object.entries(chatSnap.val()).map((evt) => ({
      rootId: evt[0],
      child: Object.entries(evt[1]).map((item) => ({ id: item[0], ...item[1] })),
    }));

    rootId.forEach((item) => {
      const refPath = firebase.database().ref(`chat/${item.rootId}`);
      item.child.forEach((item) => item.uid === userUid && refPath.child(item.id).update(updateData));
    });
  } catch (error) {
    throw error;
  }
}
