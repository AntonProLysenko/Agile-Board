const express = require("express");
const router = express.Router();
const User = require('../models/user')

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");



// POST /api/users
router.post('/', create)


module.exports = router;











// module.exports = {
//   create,
//   login,
//   checkToken,
// };


function create(req, res) {
  // Baby step...
  res.json({
    user: {
      name: req.body.name,
      email: req.body.email,
    },
  });
}
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

