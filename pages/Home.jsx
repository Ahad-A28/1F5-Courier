import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useState } from 'react';
import { getFirestore } from 'firebase/firestore'; // Adjust based on your Firebase setup
import { app, getTrackings } from '../Firebase/firebase'; // Import getTrackings
 

function Home() {
  const [text] = useTypewriter({
    words: ["Welcome to our website" , "Track your package", "Get your package details"],
    loop: 0,
    typeSpeed: 50,
    deleteSpeed:50,
  });

  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const db = getFirestore(app); // Initialize Firestore

  const handleTrack = async () => {
    const trimmedTrackingNumber = trackingNumber.trim();
    console.log("Tracking number being searched:", trimmedTrackingNumber);
    if (!trimmedTrackingNumber) {
      alert('Please enter a tracking number!');
      return;
    }

    try {
      const trackings = await getTrackings(); // Fetch all trackings
      const foundTracking = trackings.find(tracking => tracking.trackingNumber === trimmedTrackingNumber);

      if (foundTracking) {
        console.log("Found tracking data:", foundTracking);
        setTrackingData(foundTracking);
        setErrorMessage('');
      } else {
        const message = 'No tracking information found for this number!';
        setErrorMessage(message);
        alert(message);
      }
    } catch (error) {
      console.error("Error fetching trackings:", error);
      alert("An error occurred while fetching tracking information.");
    }
  };

  const TrackingCard = ({ trackingData }) => {
    if (!trackingData) return null; // Ensure trackingData is available

    return (
      <div className="tracking-card bg-white p-10 rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Tracking #{trackingData.trackingNumber}</h1>
          <div className="flex items-center">
            <i className={`fas ${trackingData.status === 'Delivered' ? 'fa-check-circle text-green-500' : trackingData.status === 'In Transit' ? 'fa-truck text-blue-500' : 'fa-exclamation-circle text-red-500'} text-5xl`}></i>
            <span className="text-lg font-semibold ml-2">{trackingData.status}</span>
          </div>
        </div>
        <p className="text-xl font-bold">
          <span className="font-semibold text-xl">Customer:</span> {trackingData.customerName}
        </p>
        <hr className="my-2" />

        <div className="flex justify-between text-lg">
          <span>Status:</span>
          <span className="font-semibold">{trackingData.status}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg">
          <span>Current Location:</span>
          <span className="font-semibold">{trackingData.currentLocation || 'N/A'}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg">
          <span>Destination:</span>
          <span className="font-semibold">{trackingData.destination || 'N/A'}</span>
        </div>
        {/* <hr className="my-2" />
        <div className="flex justify-between text-lg">
          <span>Last Updated:</span>
          <span className="font-semibold">{trackingData.lastUpdated || 'N/A'}</span>
        </div> */}
        <hr className="my-2"  />
        <div className="flex justify-between text-lg">
          <span>Estimated Delivery:</span>
          <span className="font-semibold">{trackingData.estimatedDelivery || 'N/A'}</span>
        </div>
        <hr className="my-2"  />
      </div>
    );
  };

  return (
    <>
      <div className="home text-white flex flex-col justify-center items-center gap-5 w-[90vw] h-[40.3vw]">
        <h1 className="text-4xl font-bold">1F5 COURIER</h1>
        <h1 className="text-4xl font-bold text-green-400">{text.toLocaleUpperCase()}<span className="text-white"><Cursor /></span></h1>
        <p className="sub-text text-xl text-pink-300 uppercase font-semibold">hassle-Free Delivery With Us</p>
        <input
          type="text"
          placeholder="Tracking No"
          className="p-2 w-[20rem] font-semibold outline-none rounded-md text-black"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-md font-bold"
          onClick={handleTrack}
        >
          Track Now
        </button>
    
        
      </div>
      {trackingData ? (
        <TrackingCard trackingData={trackingData} />
      ) : "" 

      }
    </>
  );
}

export default Home;