import firebase from "firebase";

let firebaseConfig = {
      apiKey: "AIzaSyCg7q784yiRCFPN6QbUrg4coMA-6yWI8s8",
      authDomain: "login-app-4a0c3.firebaseapp.com",
      projectId: "login-app-4a0c3",
      storageBucket: "login-app-4a0c3.appspot.com",
      messagingSenderId: "980663952274",
      appId: "1:980663952274:web:706b50fd84949cff7a174b"
};
    
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();

export default firebaseAuth;