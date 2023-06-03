const express = require("express");
const router = express.Router();
const User = require('../models/user')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// let currentUser
// const getCurrentUser = require("./task");

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "6h" }
  );
}
// POST /api/users
router.post('/', async (req, res)=>{
 try {

  console.log(req.body);
  
    const user = await User.create(req.body.user)
    const token = createJWT(user)
    // getCurrentUser.getCurrentUser(user);    
     res.json(token);
 } 
 catch (error) {

  console.log(error);
  if(error.keyPattern.email==1){
    res.status(401).send({message:"This User Already Exist"});
  }else{
    res.status(440).json(error)
  }
 }
})

// POST /api/users/login
router.post('/login', async(req,res)=>{
    try {        
        const user = await User.findOne({email: req.body.user.email})//finding user based on email
          if (!user)throw new Error("User not Found");
        const match = await bcrypt.compare(req.body.user.password, user.password);//comparing entered password to users password
          if(!match)throw new Error("Pasword incorect");
          // getCurrentUser.getCurrentUser(user)
        res.json(createJWT(user));
    } catch (error) {      
        res.status(401).send({message:error.message});
    }
})

//GET/api/users/check-token
router.get("/check-token",async (req,res)=>{
  // req.user will always be there for you when a token is sent

  // console.log("routerCheck" + req.user.email);
  
  res.json(req.exp);
});

// module.exports = { currentUser,router };
module.exports =  {router}












// module.exports = {
//   create,
//   login,
//   checkToken,
// };


// async function create(req, res) {
//   try {
//     // Add the user to the database
//     const user = await User.create(req.body);

//     const token = createJWT(user);
//     // Yes, we can use res.json to send back just a string
//     // The client code needs to take this into consideration
//     res.json(token);
//   } catch (err) {
//     // Client will check for non-2xx status code
//     // 400 = Bad Request
//     res.status(400).json(err);
//   }
// }

// async function login(req, res) {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) throw new Error();
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (!match) throw new Error();
//     res.json(createJWT(user));
//   } catch (err) {
//     // Client will check for non-2xx status code
//     // 400 = Bad Request
//     res.status(400).json(err);
//   }
// }


// function checkToken(req, res) {
//   // req.user will always be there for you when a token is sent
//   console.log("req.user", req.user);
//   res.json(req.exp);
// }

// function createJWT(user) {
//   return jwt.sign(
//     // data payload
//     { user },
//     process.env.SECRET,
//     { expiresIn: "2h" }
//   );
// }

