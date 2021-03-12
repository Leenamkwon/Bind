import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'bind-5d6a6.firebaseapp.com',
  projectId: 'bind-5d6a6',
  storageBucket: 'bind-5d6a6.appspot.com',
  messagingSenderId: '142762092613',
  appId: '1:142762092613:web:055943428614ffa8de1b2c',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
