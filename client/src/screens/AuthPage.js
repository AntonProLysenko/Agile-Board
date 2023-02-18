import React from 'react'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LogInForm'

export default function AuthPage({setUser}) {
  return (
    <div>AuthPage
        <SignUpForm setUser={setUser}/>
        <LoginForm setUser={setUser}/>
    </div>
  )
}
