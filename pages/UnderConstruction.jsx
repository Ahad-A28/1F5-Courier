import React, { useEffect, useState } from 'react';
import '../Styles/UnderConstruction.css'; // Import CSS for styling

const UnderConstruction = () => {
    const [countdown, setCountdown] = useState(345600); // 1 minute countdown
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0; // Stop countdown at 0
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(timer);
        };
    }, []);

    return (
        <>
        <div className= {`under-construction ${isVisible ? 'visible' : '' }` }>
            <h1 className='font-bold text-3xl uppercase text-pink-500 mb-4'>Under Construction</h1>
            <p className='font-semibold text-xl mb-4 capitalize'>This Website is currently under construction. Please check back later!</p>
            <div className='font-bold text-3xl text-green-600 mb-4'>
                {countdown > 0 
                    ? `${Math.floor(countdown / 86400)}d ${Math.floor((countdown % 86400) / 3600)}h ${Math.floor((countdown % 3600) / 60)}m ${countdown % 60}s` 
                    : "Please Wait......"}
            </div>
        </div>
        </>
    );
};

export default UnderConstruction;
