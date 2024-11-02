import React from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate()
  const onSubmit = async (event) => {
    event.preventDefault();

    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validation
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    formData.append("access_key", "85c66f0d-a7ac-422d-b9f5-df82f97aadc8");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      
      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem("formSubmitted","true" )
        navigate('/done');
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return ( 
    <>
   
 <div className="form flex justify-center mt-6 w-full">
    <form className="flex flex-col  w-1/2 h-[25rem]  p-10 mt-10 backdrop-blur-lg  bg-black/40  rounded-xl" onSubmit={onSubmit}>
      <h1 className="text-3xl text-center mb-5 font-bold text-green-300"><i className="fa-solid fa-envelope mr-2"></i>CONTACT US</h1>
        <input className="mb-6 text-lg  bg-zinc-600 rounded-lg p-2  text-white font-semibold  outline-none" type="text" name="name" placeholder="Name"/>
        <input className="mb-6 text-lg bg-zinc-600 rounded-lg p-2  text-white font-semibold  outline-none" placeholder="Email" type="email" name="email"/>
        <textarea className="mb-6 text-lg bg-zinc-600 rounded-lg p-2  text-white font-semibold  outline-none " placeholder="Message" name="message"></textarea>
        <button className="bg-pink-400  text-lg rounded-lg p-2 font-semibold  " type="submit">Submit Form</button>
      </form>
      </div>
      
      </>
  );
}

export default Contact;