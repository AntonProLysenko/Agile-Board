
export async function signUp(userData) {
//   return sendRequest("/api/users", "POST", userData);


const res = await fetch("http://localhost:3001/api/users",{
        method: "POST",
        headers : { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (res.ok){//if success
        return res.json()
    }else{
        throw new Error("Invalid Sign Up")
    }
}


export async function logIn(credentials){
    const res = await fetch("http://localhost:3001/api/users/login",{
          method: "POST",
        headers : { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)

    })
     if (res.ok){//if success
        return res.json()
    }else{
        throw new Error("Invalid Log In")
    }
}


// async function sendRequest(url, method = 'GET', payload = null) {
//   // Fetch accepts an options object as the 2nd argument
//   // used to include a data payload, set headers, etc.
//   const options = { method };
// //   if (payload) {
// //     options.headers = { 'Content-Type': 'application/json' };
// //     options.body = JSON.stringify(payload);
// //   }
// }