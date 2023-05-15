import React, { useState } from 'react'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LogInForm'

export default function AuthPage({setUser,setButtonPressed, buttonPressed, handleLogin, credentials, handleChange, error}) {
 
  const[newUser, setNewUser] = useState(false)

  return (
  <div className='AuthPage'>
    !newUser?
    <>
    <LoginForm setUser={setUser} setNewUser={setNewUser} setButtonPressed={setButtonPressed} buttonPressed= {buttonPressed} handleLogin={handleLogin} credentials={credentials} handleChange={handleChange} error={error}/>
    </> 
  :(
    <div>
    <SignUpForm setUser={setUser} setNewUser={setNewUser} setButtonPressed  = {setButtonPressed} buttonPressed= {buttonPressed}/>  
    </div>
    )
    
  </div>
  )
}
