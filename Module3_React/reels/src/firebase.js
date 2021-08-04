import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
firebase.initializeApp({
  apiKey: "AIzaSyCIKDg6rq40D_8F-wWA9UT-7qALPj2_mhI",
  authDomain: "reels-d154f.firebaseapp.com",
  databaseURL: "https://reels-d154f-default-rtdb.firebaseio.com",
  projectId: "reels-d154f",
  storageBucket: "reels-d154f.appspot.com",
  messagingSenderId: "652306721491",
  appId: "1:652306721491:web:5838631cccdc0dc52f0226"
})

export const auth = firebase.auth()
const firestore = firebase.firestore();
export const database ={
  users:firestore.collection('users'),
  posts:firestore.collection('posts'),
  comments:firestore.collection('comments'),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc:doc=>{
    return {id:doc.id,...doc.data()}
  }
}
export const storage = firebase.storage();
export default firebase
