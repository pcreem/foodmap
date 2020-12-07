import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDjPbohWAS9BBAbJLzYU71w8U6R_6dPg3Y",
  authDomain: "foodmap-76b53.firebaseapp.com",
  projectId: "foodmap-76b53",
  storageBucket: "foodmap-76b53.appspot.com",
  messagingSenderId: "720910131820",
  appId: "1:720910131820:web:eed83d18355a8ae0e5ee49"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db