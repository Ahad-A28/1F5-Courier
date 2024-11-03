import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import '../Styles/index.css'

function Navbar({ logo }) {
  const isLoggedIn = localStorage.getItem('user')
   
   

  return (
    <>
     <div className="mobile-img">
          <img src={logo} alt="1F5 - COURIER" className="h-[6rem] w-[7rem]" />
        </div>
        
    <div className= "mobile-menu "  >

<div className="mobile-links flex items-center backdrop-blur-lg bg-black/30  rounded-2xl ">

<Link className="text-xl " to='/'><i className="fa-solid fa-house mr-2"></i>Home</Link>
<Link className="text-xl" to='/about'><i className="fa-solid fa-user mr-2"></i>About</Link>
<Link className="text-xl" to='/contact'><i className="fa-solid fa-envelope mr-2"></i>Contact</Link>
{/* {isLoggedIn ? (
  <Link className="text-xl" to='/dashboard'>
      <i className='fa-solid fa-user mr-2'></i>Profile
  </Link>
) : (
  <Link className="text-xl" to='/login'>
      <i className="fa-solid fa-right-to-bracket mr-2"></i>Login
  </Link>
)} */}
</div>

</div>
      <nav className="min-w-screen nav flex justify-between items-center text-white p-6 backdrop-blur-lg bg-black/30  rounded-2xl">
        <div className="img">
          <img src={logo} alt="1F5 - COURIER" className="h-[4rem] w-[5rem]" />
        </div>
        

       
        <div className="links flex justify-between items-center gap-10">
        
          <Link className="text-2xl" to='/'><i className="fa-solid fa-house mr-2"></i>Home</Link>
          <Link className="text-2xl" to='/about'><i className="fa-solid fa-user mr-2"></i>About</Link>
          <Link className="text-2xl" to='/contact'><i className="fa-solid fa-envelope mr-2"></i>Contact</Link>
          {isLoggedIn ? (
            <Link className="text-2xl" to='/dashboard'>
                <i className='fa-solid fa-user mr-2'></i>Profile
            </Link>
          ) : (
            <Link className="text-2xl" to='/login'>
                <i className="fa-solid fa-right-to-bracket mr-2"></i>Login
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar 
