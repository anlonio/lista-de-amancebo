import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({ 
  apiKey: "AIzaSyDdMNbnVgIoWCDJH1LgSxhxmbjQ7fL2qwY",
  authDomain: "lista-de-amancebo.firebaseapp.com",
  projectId: "lista-de-amancebo",
  storageBucket: "lista-de-amancebo.appspot.com",
  messagingSenderId: "1069231112366",
  appId: "1:1069231112366:web:45323c1683417e9568ed3f"
})
export const auth = app.auth()

// Get a Firestore instance
export const db = app.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }