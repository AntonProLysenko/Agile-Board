import * as usersApi from './users-api'

export  async function signUp(userData) {

  const token = await usersApi.signUp(userData);
  localStorage.setItem("token", token)//"key" value
  return getUser();
}




export function getToken () {
    const token = localStorage.getItem("token")//in getItem we only specify the key of the item
    if (!token) return null
    // const tokenPayloadString = token.split ('.')[1]
    // const decodedPayload = atob(tokenPayloadString)
    // const parsePayload = JSON.parse(decodedPayload)
    const payload = JSON.parse(atob(token.split('.')[1]))

    if(payload.exp < Date.now()/1000){
        localStorage.removeItem("token")
        return null
    }
    return token
}


export function getUser(){
    const token = getToken()

    return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export async function logIn(credentials) {
  const token = await usersApi.logIn(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function logOut(){
     localStorage.removeItem("token");
}
