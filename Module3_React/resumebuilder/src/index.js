import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore ,createFirestoreInstance} from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';

// Ye extension hame yaad rakni hai 
import { composeWithDevTools} from 'redux-devtools-extension'
var firebaseConfig = {
  apiKey: "AIzaSyCg7q784yiRCFPN6QbUrg4coMA-6yWI8s8",
  authDomain: "login-app-4a0c3.firebaseapp.com",
  projectId: "login-app-4a0c3",
  storageBucket: "login-app-4a0c3.appspot.com",
  messagingSenderId: "980663952274",
  appId: "1:980663952274:web:706b50fd84949cff7a174b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()
const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), 
    reduxFirestore(firebase) // redux bindings for firestore,
  )
);
ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}>
      <App />
    </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);