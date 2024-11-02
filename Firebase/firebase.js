// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMYubSkxCnFou8bR_P5J9e6WwOAe9oCTk",
  authDomain: "f5-courire-main.firebaseapp.com",
  projectId: "f5-courire-main",
  storageBucket: "f5-courire-main.appspot.com",
  messagingSenderId: "426416663740",
  appId: "1:426416663740:web:4c6c1f80c7dde2d7cdf4b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

const trackingCollection = collection(db, "trackingData");

export const addTracking = async (trackingNumber) => {
  await addDoc(trackingCollection, { trackingNumber });
};

export const getTrackings = async () => {
  const snapshot = await getDocs(trackingCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const setUserRole = async (userId, role) => {
  await setDoc(doc(db, "users", userId), { role });
};

export { auth };