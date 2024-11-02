import React, { useState } from "react";
import { db } from '../Firebase/firebase'; // Import your Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const statesOfIndia = [ // Added array of states
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir"
];

const AddTrackingModal = ({ onClose }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [currentLocation, setCurrentLocation] = useState(""); // New state for selected state

  const handleSubmit = async () => {
    try {
      // Save data to Firebase
      await addDoc(collection(db, "trackingData"), { // Change "trackingData" to your collection name
        trackingNumber,
        customerName,
        destination,
        estimatedDelivery,
        currentLocation, // Include selected state in the data
      });
     
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Tracking</h2>
        <input 
          type="text" 
          placeholder="Tracking Number" 
          className="border p-2 mb-4 w-full"
          onChange={(e) => setTrackingNumber(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Customer Name" 
          className="border p-2 mb-4 w-full"
          onChange={(e) => setCustomerName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Destination" 
          className="border p-2 mb-4 w-full"
          onChange={(e) => setDestination(e.target.value)} 
        />
        <input 
          type="date"  
        
          className="border p-2 mb-4 w-full"
          onChange={(e) => setEstimatedDelivery(e.target.value)} 
        />
        <select 
          className="border p-2 mb-4 w-full" 
          onChange={(e) => setCurrentLocation(e.target.value)} // Handle state selection
        >
          <option value="">Current Location</option> {/* Placeholder option */}
          {statesOfIndia.map((state) => ( // Render states as options
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Add Tracking</button>
        </div>
      </div>
    </div>
  );
};

export default AddTrackingModal;
