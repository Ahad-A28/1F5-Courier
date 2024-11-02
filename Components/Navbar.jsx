import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import '../Styles/index.css'

function Navbar() {
  const  isLoggedIn = localStorage.getItem('user')
  return (
    <>
      <nav className="min-w-screen flex justify-between items-center text-white p-5 backdrop-blur-lg bg-white/30 rounded-lg">
        <div className="img">
          <Link to='/'><img src="src\assets\logo.png" alt="logo"  className="h-[4rem] w-[5rem]"/ ></Link>
        </div>
        <div className="links flex justify-between items-center gap-10">
          <Link className="text-xl" to='/'><i className="fa-solid fa-house mr-2"></i>Home</Link>
          <Link className="text-xl" to='/about'><i className="fa-solid fa-user mr-2"></i>About</Link>
          <Link className="text-xl" to='/contact'><i className="fa-solid fa-envelope mr-2"></i>Contact</Link>
          {isLoggedIn ? (
            <Link className="text-xl" to='/dashboard'>
                <i className='fa-solid fa-user mr-2'></i>Profile
            </Link>
          ) : (
            <Link className="text-xl" to='/login'>
                <i className="fa-solid fa-right-to-bracket mr-2"></i>Login
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar 
 
