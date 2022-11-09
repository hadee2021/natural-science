 /* eslint-disable */ 
import { initializeApp } from "firebase/app"
import { getFirestore, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"

const API_KEY = process.env.REACT_APP_API_KEY

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "natural-science-a2e20.firebaseapp.com",
  projectId: "natural-science-a2e20",
  storageBucket: "natural-science-a2e20.appspot.com",
  messagingSenderId: "914351813602",
  appId: "1:914351813602:web:445c8a8b4a7b8b638effbb",
  measurementId: "G-JXVLDC45VH"
}

export const app = initializeApp(firebaseConfig)

export const fireStore = getFirestore(app)

export const analytics = getAnalytics(app)

export const storage = getStorage(app)

/** Firestore 문서와 코드쪽 도메인 모델을 변환 */
export function getDefaultConverter<T> () {
  return {
    toFirestore (_: T) {
      return _
    },
    fromFirestore (
      snapshot: QueryDocumentSnapshot<T>,
      options: SnapshotOptions,
    ): T {
      return snapshot.data(options)!
    },
  }
}