import firebase from '../config/firebase';
const db = firebase.firestore();

export async function createChat(otherUser, history) {
  const user = firebase.auth().currentUser;

  let data = {
    lastMessage: '',
    particapate: [],
    chatUserIds: firebase.firestore.FieldValue.arrayUnion(user.uid, otherUser.id),
    chatUsers: firebase.firestore.FieldValue.arrayUnion(
      {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
        isRead: false,
      },
      {
        id: otherUser.id,
        displayName: otherUser.displayName,
        photoURL: otherUser.photoURL || null,
        isRead: false,
      }
    ),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  try {
    const chatDoc = db.collection('chat').where('chatUserIds', 'array-contains', otherUser.id).limit(1);
    const isEmpty = await chatDoc.get();

    if (isEmpty.empty) {
      const docRef = await db.collection('chat').add(data);
      return history.push(`/chat/${docRef.id}`);
    }

    history.push(`/chat/${isEmpty.docs[0].id}`);
  } catch (error) {
    throw error;
  }
}

export function getChatList() {
  const user = firebase.auth().currentUser;
  return db.collection('chat').where('chatUserIds', 'array-contains', user.uid).orderBy('createdAt', 'desc');
}

export async function sendMessage(chatId, text) {
  const user = firebase.auth().currentUser;

  try {
    await db.collection('chat').doc(chatId).update({
      lastMessage: text,
    });

    return await db
      .collection('chat')
      .doc(chatId)
      .collection('message')
      .add({
        text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
        photoURL: user.photoURL || null,
        displayName: user.displayName || user.email.split('@')[0],
      });
  } catch (error) {
    throw error;
  }
}

export function getChatMessageList(chatId) {
  return db.collection('chat').doc(chatId).collection('message').orderBy('createdAt');
}
