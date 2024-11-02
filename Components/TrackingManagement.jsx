import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const TrackingManagement = ({ onAddClick }) => {
    const navigate = useNavigate();
    const [trackingData, setTrackingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();
    const auth = getAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                setIsLoggedIn(false);
                navigate("/login");
            } else {
                setIsLoggedIn(true);
                fetchTrackingData();
            }
        });

        return () => unsubscribe();
    }, [navigate, auth]);

    const fetchTrackingData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "trackingData"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTrackingData(data);
        } catch (error) {
            console.error("Error fetching tracking data: ", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status, currentLocation) => {
        try {
            const trackingRef = doc(db, "trackingData", id);
            await updateDoc(trackingRef, { status, currentLocation });
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    const deleteTracking = async (id) => {
        try {
            const trackingRef = doc(db, "trackingData", id);
            await deleteDoc(trackingRef);
            fetchTrackingData();
        } catch (error) {
            console.error("Error deleting tracking data: ", error);
        }
    };

    const handleLogout = async () => {
        try {
           localStorage.removeItem("user")
            navigate("/login");
            window.location.reload();
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Tracking Management</h1>
            <button 
                onClick={onAddClick} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                + Add New Tracking
            </button>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
            >
                Log Out
            </button>
            <div className="mt-6">
                <table className="w-full bg-white shadow rounded">
                    <thead>
                        <tr className="border-b">
                            <th className="py-4 px-2 text-left">Tracking Number</th>
                            <th className="py-4 px-2 text-left">Customer</th>
                            <th className="py-4 px-2 text-left">Status</th>
                            <th className="py-4 px-2 text-left">Destination</th>
                            <th className="py-4 px-2 text-left">CurrentLocation</th>
                            <th className="py-4 px-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-4 px-2">
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : trackingData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 px-2 text-center">No tracking data available.</td>
                            </tr>
                        ) : (
                            trackingData.map((tracking) => (
                                <tr key={tracking.id} className="border-b">
                                    <td className="py-4 px-2">{tracking.trackingNumber}</td>
                                    <td className="py-4 px-2">{tracking.customerName}</td>
                                    <td className={`py-4 px-2 ${tracking.status === 'Delivered' ? 'text-green-500' : tracking.status === 'In Transit' ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {tracking.status}
                                    </td>
                                    <td className="py-4 px-2">{tracking.destination}</td>
                                    <td className="py-4 px-2">{tracking.currentLocation}</td>
                                    <td className="py-4 px-2">
                                        <select 
                                            onChange={(e) => updateStatus(tracking.id, e.target.value, tracking.currentLocation)}
                                            className="border rounded p-1"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="In Transit">In Transit</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Failed">Failed</option>
                                        </select>
                                        <button 
                                            onClick={() => deleteTracking(tracking.id)}
                                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
          
        </div>
    );
};

export default TrackingManagement;