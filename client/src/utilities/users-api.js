import { getToken } from "./user-service";
import axios from "axios";

const BASIC_URL = process.env.REACT_APP_BASIC_URL;

export async function signUp(userData){
  try {
    const res = await axios.post(`${BASIC_URL}/api/users`, {
      user: userData,
    });

    // console.log(userData);
    
    return res.data;
  } catch (error) {
    // console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

// export async function signUp(userData) {
//   //   return sendRequest("/api/users", "POST", userData);
//   const res = await fetch(`${BASIC_URL}/api/users`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   if (res.ok) {
//     //if success
//     return res.json();
//   } else {

//     console.log(res);
    
//     throw new Error("Invalid Sign Up");
//   }
// }

// export async function logIn(credentials) {
//   const res = await fetch(`${BASIC_URL}/api/users/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(credentials),
//   });
//   if (res.ok) {
//     //if success
//     return res.json();
//   }else{
//    throw Error("w");
//   }
// }

export async function logIn (credentials){
  try {
    const res = await axios.post(`${BASIC_URL}/api/users/login`, {
      user:credentials,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message)
    // console.log(error);   
  }
}

// export async function checkToken(){
//   const token = getToken();
//   const res = await fetch (`${BASIC_URL}/api/users/check-token`,{
//   method: "GET"    
//     });
//   if (res.ok) {
//     //if success
//     return res.json();
//   } else {
//     throw new Error("Invalid Token");
//   }
// }


export  function checkToken() {
  return sendRequest(`${BASIC_URL}/api/users/check-token`);
}


 async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
    const token = getToken();

 if (token) {
   // Ensure the headers object exists
   options.headers = options.headers || {};
   // Add token to an Authorization header
   options.headers.Authorization = `Bearer ${token}`; // Prefacing with 'Bearer' is recommended in the HTTP specification
 
//  console.log(options.headers.Authorization);
 
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}
