import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Navbar from "../Components/Navbar"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../Components/Auth/Login"
import Done from "../Components/done"
import TrackingManagement from "../Components/TrackingManagement";
import AddTrackingModal from "../Components/AddTrackingModal";
import { addTracking, getTrackings } from "../Firebase/firebase";
import UnderConstruction from "../pages/UnderConstruction";
 
function App() {
  const [showModal, setShowModal] = useState(false);
  const [trackings, setTrackings] = useState([]);

  const fetchTrackings = async () => {
    try {
      console.log("Fetching trackings..."); // Log when fetching starts
      const data = await getTrackings();
      console.log("Fetched trackings:", data); // Log the fetched data
      setTrackings(data);
    } catch (error) {
      console.error("Error fetching trackings:", error); // Log the error
    }
  };

  useEffect(() => {
    fetchTrackings();
  }, []);

  const handleAddTracking = async (newTracking) => {
    await addTracking(newTracking);
    fetchTrackings();
  };
  return (
    <>

 
 <div className="main  backdrop-blur-md bg-black/20  p-5  h-screen    ">
 <Navbar/>
 
 <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/done" element={<Done/>}/>
    <Route path="/dashboard" element={<TrackingManagement onAddClick={() => setShowModal(true)} />} />
     
    </Routes>
 
 <div className="content">
    {showModal && (
        <AddTrackingModal 
            onClose={() => setShowModal(false)} 
            onSave={handleAddTracking} 
        />
    )}
</div>
 </div>
    <UnderConstruction/>
  
    </>
 
  )
}

export default App
