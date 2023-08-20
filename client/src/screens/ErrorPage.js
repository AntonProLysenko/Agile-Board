import React from 'react'
import { Link } from "react-router-dom";

export default function ErrorPage({errorMessage, errorCode, errorHeight,setButtonPressed, buttonPressed} ) {
  console.log(errorMessage);
  console.log(errorCode);

console.log(errorHeight);

let topPadding = {top:`${errorHeight}`}
  return (
    <>
      <div className='error-page' style={topPadding}>
      <h1>Error</h1>
      <h1> {errorCode} </h1> 
      <h2>{errorMessage}</h2>
      <Link to ="/" onClick={()=>setButtonPressed(!buttonPressed)}><h3>Go back to main page</h3></Link>

      </div>
    </>
  );
}
