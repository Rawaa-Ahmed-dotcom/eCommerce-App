import React from 'react'
import LoginForm from '../components/forms/LoginForm/LoginForm'

const Login = () => {
  return (
    <div className="h-full w-full flex fixed flex-col lg:flex-row">
      <img src = "/public/Section - Left Side_ Hero Image (Visible and fixed on desktop, header on mobile).png" className='object-cover w-[60%] max-h-full'/>
      <LoginForm/>
    </div>
  )
}

export default Login
