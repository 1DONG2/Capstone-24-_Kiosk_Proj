import { initializeApp } from "firebase/app";
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
  // apiKey: "AIzaSyCiH0NxNed7E7tvGAb0dBbUS_ZsJDqGzPk",
  // authDomain: "capstone-design-99838.firebaseapp.com",
  // projectId: "capstone-design-99838",
  // storageBucket: "capstone-design-99838.firebasestorage.app",
  // messagingSenderId: "427602664188",
  // appId: "1:427602664188:web:2712bff175f0472de2d579",
  // measurementId: "G-WCN4X0P7FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// firestore export
export {db}