// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcqF3RudLcoGbGOzMKWumuQOCnuD0GX8Q",
  authDomain: "bark-audio.firebaseapp.com",
  projectId: "bark-audio",
  storageBucket: "bark-audio.appspot.com",
  messagingSenderId: "976342834753",
  appId: "1:976342834753:web:832bd57d4bb7251a50b0c0",
  measurementId: "G-9929V6T7HK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();