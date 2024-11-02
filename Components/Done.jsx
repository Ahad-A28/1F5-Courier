import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Done() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if form was actually submitted
    const isFormSubmitted = localStorage.getItem('formSubmitted');
    
    // If no submission status found, redirect to contact page
    if (!isFormSubmitted) {
      navigate('/contact');
      return;
    }
    
    // Clear the submission status when component unmounts
    return () => {
      localStorage.removeItem('formSubmitted');
    };
  }, [navigate]);

  return (
  <>
    <div className="done w-screen h-screen flex  justify-center">
    <div className="flex flex-col items-center   w-1/2 h-[25rem]  mt-10 backdrop-blur-lg  bg-black/40  rounded-xl">
      <img className="h-[10rem] w-[10rem]" src="../src/assets/Animation.gif" alt="" />
      <p className="text-white font-semibold uppercase">Your Form is Submitted successfully</p>
      <p className="text-zinc-500 font-semibold capitalize">We will reach to you as soon as posible </p>
      <Link className="bg-pink-400 mt-6 text-lg rounded-lg p-2 font-semibold uppercase" to="/"><i className="fa-solid fa-left-long mr-3 mt-2 "></i>Go Back To Home</Link>
    </div>
    </div>
   
    </>
  );
}

export default Done;