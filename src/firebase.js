import { initializeApp } from 'firebase';
const app = initializeApp({
  apiKey: 'AIzaSyDqdwo6RcUu9NmoTpqKpAuo1xbwcf2uIVQ',
  authDomain: 'onyx-1485507111744.firebaseapp.com',
  databaseURL: 'https://onyx-1485507111744.firebaseio.com',
  projectId: 'onyx-1485507111744',
  storageBucket: 'onyx-1485507111744.appspot.com',
  messagingSenderId: '185215280338',
})

export const db = app.database()
export const namesRef = db.ref('names')
export const dominosRef = db.ref('dominos')
export const roomsRef = db.ref('rooms')
