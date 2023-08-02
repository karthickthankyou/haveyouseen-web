import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCqUNuPY9KqTeOO-bSox933rHjKK73yWWY',
  authDomain: 'karthick-haveyouseen.firebaseapp.com',
  projectId: 'karthick-haveyouseen',
  storageBucket: 'karthick-haveyouseen.appspot.com',
  messagingSenderId: '184229030475',
  appId: '1:184229030475:web:c9ca4a8dccebe29063fbce',
  measurementId: 'G-FGTC0FG2Y8',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export const auth = getAuth(firebaseApp)
