import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// firestore를 불러오는 모듈을 임포트
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy5EgJY2NXfc6lcDfpn2gNB3ypLswq3LU",
  authDomain: "test-4d484.firebaseapp.com",
  projectId: "test-4d484",
  storageBucket: "test-4d484.firebasestorage.app",
  messagingSenderId: "751081462494",
  appId: "1:751081462494:web:fbb4aaa1d038d9576d804f",
  measurementId: "G-CTYW9PW9YM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;