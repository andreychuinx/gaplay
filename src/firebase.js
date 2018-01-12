import { initializeApp } from 'firebase';
const app = initializeApp({
  apiKey: "AIzaSyApxx1IYvZmmV7TdtZUO7QU341YSqv5e4U",
  authDomain: "vuejs-firebase-01-3b3e7.firebaseapp.com",
  databaseURL: "https://vuejs-firebase-01-3b3e7.firebaseio.com",
  projectId: "vuejs-firebase-01-3b3e7",
  storageBucket: "vuejs-firebase-01-3b3e7.appspot.com",
  messagingSenderId: "122647057086"
})

export const db = app.database()
export const userRef = db.ref('user')
