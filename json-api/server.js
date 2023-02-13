require('dotenv').config();
const express = require('express')
const app = express ();
cors = require ('cors')

const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 3001

const taskRouter = require('./controllers/task')



//connection
require('./models/connection')

//Midlware
app.use(cors())
app.use(express.json())
//Routes
app.use("/tasks", taskRouter)

app.post('/login', (req,res) =>{
    //Authenticate user
    const username = req.body.username
    const user = {name:username}

    const acessToken = jwt.sign(user, process.env.SECRET)
    res.json({acessToken: acessToken})
})




app.listen(PORT,()=>{
    console.log('Listening on port: ' + PORT)
})
