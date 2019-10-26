import * as firebase from 'firebase';

 const DB_CONFIG  = {
    apiKey: "AIzaSyCN4YbzYF5WLwRwnglCX2r4IcehS8aPDOQ",
    authDomain: "iiitdguesthouseapp.firebaseapp.com",
    databaseURL: "https://iiitdguesthouseapp.firebaseio.com",
    projectId: "iiitdguesthouseapp",
    storageBucket: "iiitdguesthouseapp.appspot.com",
    messagingSenderId: "957363277650",
    appId: "1:957363277650:web:7241b0ceefa7adb5e6348b"
  };

firebase.initializeApp(DB_CONFIG);
var firestore = firebase.firestore();
var settings = { timestampsInSnapshots: true }; // force Timestamp object instead of Date
firestore.settings(settings);




  export default firebase;