import React from 'react'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LogInForm'

export default function AuthPage({setUser,setButtonPressed, buttonPressed}) {
  return (
    <div>
      AuthPage
      <SignUpForm setUser={setUser} setButtonPressed  = {setButtonPressed} buttonPressed= {buttonPressed}/>
      <LoginForm setUser={setUser} setButtonPressed  = {setButtonPressed} buttonPressed= {buttonPressed}/>
    </div>
  );
}
