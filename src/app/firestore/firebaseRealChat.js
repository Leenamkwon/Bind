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
    const chatDoc = db.collection('chat').where('chatUserIds', 'array-contains', otherUser.id);
    const isEmpty = await chatDoc.get();

    const some = isEmpty.docs.some((item) => item.data().chatUserIds.indexOf(user.uid) !== -1);

    if (!some) {
      const docRef = await db.collection('chat').add(data);
      return history.push(`/chat/${docRef.id}`);
    } else {
      history.push(`/chat/${isEmpty.docs[0].id}`);
    }
  } catch (error) {
    throw error;
  }
}

export function getChatList() {
  const user = firebase.auth().currentUser;
  return db.collection('chat').where('chatUserIds', 'array-contains', user.uid).orderBy('createdAt', 'desc');
}

export async function sendMessage(chatId, text) {
  const currentUser = firebase.auth().currentUser;
  const docRef = db.collection('chat').doc(chatId);

  try {
    const docRefData = await docRef.get();

    function badgeCount(count) {
      if (docRefData.data().particapate.length === 2) {
        return count;
      }
      return count + 1;
    }

    await docRef.update({
      lastMessage: text,
      lastMessageTime: firebase.firestore.FieldValue.serverTimestamp(),
      chatUsers: docRefData.data().chatUsers.map((user) => {
        if (user.id !== currentUser.uid) {
          return { ...user, isRead: badgeCount(user.isRead) };
        } else {
          return user;
        }
      }),
    });

    return firebase
      .database()
      .ref(`message/${chatId}`)
      .push({
        text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        uid: currentUser.uid,
        photoURL: currentUser.photoURL || null,
        displayName: currentUser.displayName || currentUser.email.split('@')[0],
      });
  } catch (error) {
    throw error;
  }
}

export function getChatMessageList(chatId) {
  return firebase.database().ref(`message/${chatId}`).orderByKey();
}

export async function particapateChat(chatId, type, history) {
  const user = firebase.auth().currentUser;
  const chatDocRef = db.collection('chat').doc(chatId);
  const chatDocRefData = await chatDocRef.get();

  if (!chatDocRefData.exists) return history.push('/chat');
  if (chatDocRefData.data().chatUserIds.indexOf(user.uid) === -1) return history.push('/chat');

  if (type === 'participate') {
    return chatDocRef.update({
      particapate: firebase.firestore.FieldValue.arrayUnion(user.uid),
      chatUsers: chatDocRefData.data().chatUsers.map((anotherUser) => {
        if (anotherUser.id === user.uid) {
          return { ...anotherUser, isRead: 0 };
        }
        return anotherUser;
      }),
    });
  } else {
    return chatDocRef.update({
      particapate: firebase.firestore.FieldValue.arrayRemove(user.uid),
    });
  }
}

// 채팅 아바타 업데이트
export async function realChatPhotoIconUpdate(root, photoData) {
  const userUid = firebase.auth().currentUser.uid;
  const chatRef = firebase.database().ref(root);

  try {
    const chatSnap = await chatRef.get();
    if (chatSnap.exists()) {
      const rootId = Object.entries(chatSnap.val()).map((evt) => evt[0]);

      if (rootId.length) {
        for (let val of rootId) {
          const childRef = chatRef.child(val);
          const data = await childRef.get();
          const key = Object.keys(data.val());

          for (let val of key) {
            const test = childRef.child(val);
            const data = await test.get();

            if (data.val().uid === userUid) {
              test.ref.update(photoData);
            }
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
}
