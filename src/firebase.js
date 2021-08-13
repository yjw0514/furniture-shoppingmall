import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCFxVyrYa4rmliSyxjxXtyNR_wWwRu6NBg",
  authDomain: "todo-28bff.firebaseapp.com",
  projectId: "todo-28bff",
  storageBucket: "todo-28bff.appspot.com",
  messagingSenderId: "459795021713",
  appId: "1:459795021713:web:1fae88ad278ffed386a430",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const storage = firebase.storage();
