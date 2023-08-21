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

//Middleware
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "build")));
app.use(token);
// app.use(token);


//Routes
app.use("/tasks", token,taskRouter.router);

app.use("/api/users",token, userRouter.router);




app.listen(PORT,()=>{
    console.log('Express is listening on port: ' + PORT)
})
