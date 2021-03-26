const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const storage = admin.storage();
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

      realDB.ref(`/notification/${context.params.profileId}`).push(newPost(userDoc.data(), 'follow', null));

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

      realDB.ref(`/notification/${context.params.profileId}`).push(newPost(userDoc.data(), 'unfollow', null));

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

  // EVENT IN
  if (before.attendees.length < after.attendees.length) {
    let attendeeJoined = after.attendees.filter((item1) => before.attendees.some((item2) => item2.id !== item1.id))[0];
    try {
      const targetFollowers = await db.collection('following').doc(attendeeJoined.id).collection('userFollowers').get();

      if (!targetFollowers.empty) {
        targetFollowers.forEach((follwer) => {
          realDB.ref(`/notification/${follwer.id}`).push(newPost(attendeeJoined, 'join-event', context.params.eventId));
        });
      }

      realDB.ref(`/notification/${before.hostUid}`).push(newPost(attendeeJoined, 'my-event-joined', context.params.eventId));
    } catch (error) {
      console.log(error);
    }
  }
});

function newPost(user, code, eventId) {
  return {
    userUid: user.id,
    code,
    eventId,
    photoURL: user.photoURL,
    displayName: user.displayName,
    date: realDB.ServerValue.TIMESTAMP,
    isChecked: false,
  };
}
