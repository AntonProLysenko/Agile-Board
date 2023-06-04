import React from 'react'
import { Link } from "react-router-dom";

export default function ErrorPage({errorMessage, errorCode} ) {
  console.log(errorMessage);
  // console.log(errorMessageCode);

  return (
    <>
      <div className='error-page'>
      <h1>Error</h1>
      <h1> {errorCode} </h1> 
      <h2>{errorMessage}</h2>
      <Link to ="/"><h3>Go back to main page</h3></Link>

      </div>
    </>
  );
}
