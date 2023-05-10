import React from 'react'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LogInForm'

export default function AuthPage({setUser,setButtonPressed, buttonPressed, handleLogin, credentials, handleChange, error}) {
 
  return (
    
    <div>
      AuthPage
      <SignUpForm setUser={setUser} setButtonPressed  = {setButtonPressed} buttonPressed= {buttonPressed}/>
      <LoginForm setUser={setUser} setButtonPressed  = {setButtonPressed} buttonPressed= {buttonPressed} handleLogin={handleLogin} credentials={credentials} handleChange={handleChange} error={error}/>
    </div>
  );
}
