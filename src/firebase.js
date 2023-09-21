// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from '@firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCwHovx417sv4E6YfLY3FbTCghPDHHo3Eo',
  authDomain: 'lulufirebaseproject.firebaseapp.com',
  projectId: 'lulufirebaseproject',
  storageBucket: 'lulufirebaseproject.appspot.com',
  messagingSenderId: '534928442516',
  appId: '1:534928442516:web:b895cdeb68c37d577f2081',
  measurementId: 'G-B9ZGDHV00K'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const firestore = getFirestore(app)
