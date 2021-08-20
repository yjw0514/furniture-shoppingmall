import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCgaebHPnEizpmup_nOA29cV9WDKMWKHNM',
  authDomain: 'todo-test-7dc8f.firebaseapp.com',
  projectId: 'todo-test-7dc8f',
  storageBucket: 'todo-test-7dc8f.appspot.com',
  messagingSenderId: '317153175859',
  appId: '1:317153175859:web:e38cb89d8991f010c1b646',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
export const storage = firebase.storage();
export const config = firebaseConfig;
