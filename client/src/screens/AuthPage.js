import React, { useState, useEffect } from 'react'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LogInForm'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AuthPage({setUser,setButtonPressed, buttonPressed, handleLogin, credentials, handleChange, error}) {
 
  const[newUser, setNewUser] = useState(false)

  const showToastMessage = () => {
    toast.info("Email: test@test; Password: test", {
      position: "top-center"
    });
    // toast("Wow so easy !")
  };

  useEffect(() => {
    // call api or anything
    showToastMessage()
 },[]);

  return (

    !newUser?
    <>
    {/* <button onClick={}>Notify</button> */}

      <ToastContainer />
    {/* {alert("Email: test@test Password: testis")} */}
    <LoginForm setUser={setUser} setNewUser={setNewUser} setButtonPressed={setButtonPressed} buttonPressed= {buttonPressed} handleLogin={handleLogin} credentials={credentials} handleChange={handleChange} error={error}/>
    </> 
  :(
    <div>
    <SignUpForm setUser={setUser} setNewUser={setNewUser} setButtonPressed  = {setButtonPressed} buttonPressed= {buttonPressed}/>  
    </div>
    )
  
  )
}