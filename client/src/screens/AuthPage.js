import React from 'react'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LogInForm'

export default function AuthPage({setUser,setButtonPressed, buttonPressed, handleLogin, credentials, handleChange, error}) {
  alert(
    "The development of this app is ongoing! The backend is completed. However, the work on styles is still in progress. Therefore, I kindly request that you reserve your judgement on the styles until they have been finalized."
  );
  return (
    <div>
      AuthPage
      <SignUpForm setUser={setUser} setButtonPressed  = {setButtonPressed} buttonPressed= {buttonPressed}/>
      <LoginForm setUser={setUser} setButtonPressed  = {setButtonPressed} buttonPressed= {buttonPressed} handleLogin={handleLogin} credentials={credentials} handleChange={handleChange} error={error}/>
    </div>
  );
}
