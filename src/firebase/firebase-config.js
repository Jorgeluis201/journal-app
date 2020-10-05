
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

  const firebaseConfig = {
    apiKey: "AIzaSyB9pxMmyJAG66rEW6jBxUwsDYDVJiCbddk",
    authDomain: "react-apps-cursos-6d615.firebaseapp.com",
    databaseURL: "https://react-apps-cursos-6d615.firebaseio.com",
    projectId: "react-apps-cursos-6d615",
    storageBucket: "react-apps-cursos-6d615.appspot.com",
    messagingSenderId: "356405780026",
    appId: "1:356405780026:web:b76d75f3d5345e7193df03"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Preparamos esto para grabar informacion
// Esto es la referencia  a la base de datos
  const db = firebase.firestore();
//  Esto es para autentificarse con google
// 
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export{
      db,
      googleAuthProvider,
      firebase
  }