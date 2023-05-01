require('dotenv').config();
const express = require('express')
const app = express ();
const cors = require ('cors')
const path = require("path");

const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 3001

const token = require("./models/checkToken")
const taskRouter = require('./controllers/task')
const userRouter = require("./controllers/user");





//connection
require('./models/connection')

//Midlware
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "build")));
app.use(token);

// function authenticateToken(req,res,next){
//     const authHeader = req.headers['authorization']
//     const token = authHeader&&authHeader.split(" ")[1];
//     if(token ===null)return res.sendStatus(401)

//     jwt.verify(token, process.env.SECRET, (err, user)=>{
//         if(!err){
//             req.user = user
//             next()
//         }else{
//             return res.sendStatus(403)
//         }
//     })
// }
//Routes
// app.use("/tasks", authenticateToken, taskRouter);
app.use("/tasks", token,taskRouter.router);
app.use("/api/users",token, userRouter.router);

// app.post('/login', (req,res) =>{
//     //Authenticate user
//     const username = req.body.username
//     const user = {name:username}

//     const acessToken = jwt.sign(user, process.env.SECRET)
//     res.json({acessToken: acessToken})
// })




app.listen(PORT,()=>{
    console.log('Express is listening on port: ' + PORT)
})
