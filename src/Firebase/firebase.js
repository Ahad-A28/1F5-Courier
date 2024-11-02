import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the import based on your setup

export const getTrackings = async () => {
  const trackingsCollection = collection(db, "trackingData"); // Ensure this matches your collection name
  const trackingSnapshot = await getDocs(trackingsCollection);
  const trackingList = trackingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return trackingList; // Return the list of trackings
};

export const addTracking = async (newTracking) => {
  const trackingCollection = collection(db, "trackingData");
  await addDoc(trackingCollection, newTracking); // Ensure this is correct
  console.log("Added tracking:", newTracking); // Log the added tracking
}; 