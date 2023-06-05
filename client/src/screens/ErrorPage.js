import React from 'react'

export default function ErrorPage({errorMessage, errorCode} ) {
  console.log(errorMessage);
  // console.log(errorMessageCode);

  return (
    <>
      <div>ErrorPage</div>;
      <p>
        {errorCode}
        {errorMessage}
      </p>
    </>
  );
}
