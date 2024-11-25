import app from 'firebase/app';
import firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBk5D8CUQu_-bNxaz1DiwkvwhEYaKWMDJ0",
    authDomain: "grupo6-reactnative.firebaseapp.com",
    projectId: "grupo6-reactnative",
    storageBucket: "grupo6-reactnative.firebasestorage.app",
    messagingSenderId: "986250223306",
    appId: "1:986250223306:web:e5cc4b3aa528c460dc5e33"
};
  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();
  