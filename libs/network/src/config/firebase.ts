import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBM9xoVcQLKu11r4urLmke6-R_wsQv0MdQ',
  authDomain: 'autospace-karthick.firebaseapp.com',
  projectId: 'autospace-karthick',
  storageBucket: 'autospace-karthick.appspot.com',
  messagingSenderId: '922694220157',
  appId: '1:922694220157:web:43ca5cbcabef78b990b414',
  measurementId: 'G-LMFTE66MXH',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export const auth = getAuth(firebaseApp)
