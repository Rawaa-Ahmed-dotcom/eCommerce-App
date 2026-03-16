import React from 'react'
import LoginForm from '../components/forms/LoginForm/LoginForm'

const Login = () => {
  return (
    // 
    <div className="relative md:fixed w-full h-screen">
  
  <img 
    src="/public/Section - Left Side_ Hero Image (Visible and fixed on desktop, header on mobile).png" 
    className="absolute inset-0 w-full h-full object-cover md:w-[60%] z-1"
  />
  
 
  <div className="absolute bottom-0 left-0 right-0 h-[60%] md:static md:h-full md:w-[40%] md:ml-auto z-10">
    <LoginForm />
  </div>
</div>
  )
}

export default Login
