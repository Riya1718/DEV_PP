import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// Initialize Firebase
let fbObj = {
    apiKey: "AIzaSyCg7q784yiRCFPN6QbUrg4coMA-6yWI8s8",
    authDomain: "login-app-4a0c3.firebaseapp.com",
    projectId: "login-app-4a0c3",
    storageBucket: "login-app-4a0c3.appspot.com",
    messagingSenderId: "980663952274",
    appId: "1:980663952274:web:706b50fd84949cff7a174b"
}
firebase.initializeApp(fbObj);
export default firebase;
