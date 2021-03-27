const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const realDB = admin.database();

/* 
  팔로우
*/
exports.addFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onCreate(async (snapshot, context) => {
    try {
      const batch = db.batch();
      const userDoc = await db.collection('users').doc(context.params.userUid).get();

      batch.set(
        db.collection('following').doc(context.params.profileId).collection('userFollowers').doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );

      batch.update(db.collection('users').doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });

      admin.database().ref(`/notification/${context.params.profileId}`).push(newPost(userDoc.data(), 'follow', null));

      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

/* 
  언팔로우
  */
exports.removeFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    try {
      const userDoc = await db.collection('users').doc(context.params.userUid).get();

      batch.delete(
        db.collection('following').doc(context.params.profileId).collection('userFollowers').doc(context.params.userUid)
      );

      batch.update(db.collection('users').doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(-1),
      });

      admin.database().ref(`/notification/${context.params.profileId}`).push(newPost(userDoc.data(), 'unfollow', null));

      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

/* 
    알림 보내기
  */
exports.eventUpdated = functions.firestore.document('events/{eventId}').onUpdate(async (snapshot, context) => {
  const before = snapshot.before.data();
  const after = snapshot.after.data();

  // 이벤트 참가
  if (before.attendees.length < after.attendees.length) {
    let attendeeJoined = after.attendees.filter((item1) => before.attendees.some((item2) => item2.id !== item1.id))[0];
    try {
      const targetFollowers = await db.collection('following').doc(attendeeJoined.id).collection('userFollowers').get();

      if (!targetFollowers.empty) {
        targetFollowers.forEach((follwer) => {
          realDB.ref(`/notification/${follwer.id}`).push(newPost(attendeeJoined, 'event-join', context.params.eventId));
        });
      }

      admin
        .database()
        .ref(`/notification/${before.hostUid}`)
        .push(newPost(attendeeJoined, 'my-event-joined', context.params.eventId));
    } catch (error) {
      console.log(error);
    }
  }

  // 이벤트 나감
  if (before.attendees.length > after.attendees.length) {
    let attendeeLeft = before.attendees.filter((item1) => !after.attendees.some((item2) => item2.id === item1.id))[0];

    try {
      const targetFollowers = await db.collection('following').doc(attendeeLeft.id).collection('userFollowers').get();

      if (!targetFollowers.empty) {
        targetFollowers.forEach((follower) => {
          admin
            .database()
            .ref(`/posts/${follower.id}`)
            .push(newPost(attendeeLeft, 'event-out', context.params.eventId, before));
        });
      }

      admin
        .database()
        .ref(`/notification/${before.hostUid}`)
        .push(newPost(attendeeLeft, 'my-event-joined', context.params.eventId));
    } catch (error) {
      console.log(error);
    }
  }

  // LIKES
  if (before.likesPeople.length < after.likesPeople.length) {
    let likesEvent = after.likesPeople.filter((item1) => before.likesPeople.indexOf(item1) === -1)[0];

    try {
      let likedUser = db.collection('users').doc(likesEvent);
      const targetUser = await likedUser.get();

      admin
        .database()
        .ref(`/notification/${before.hostUid}`)
        .push(newPost(targetUser.data(), 'like', context.params.eventId, before));
    } catch (error) {
      console.log(error);
    }
  }
});

function newPost(user, code, eventId) {
  return {
    userUid: user?.id ?? user.email.split('@')[0],
    code,
    eventId: eventId || null,
    photoURL: user.photoURL,
    displayName: user.displayName,
    date: admin.database.ServerValue.TIMESTAMP,
    isChecked: false,
  };
}
