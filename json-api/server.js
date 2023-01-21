require('dotenv').config();
const express = require('express')
const app = express ();
cors = require ('cors')
const PORT = process.env.PORT || 3001

const taskRouter = require('./controllers/task')



//connection
require('./models/connection')

//Midlware
app.use(cors())
app.use(express.json())
//Routes
app.use("/tasks", taskRouter)




app.listen(PORT,()=>{
    console.log('Listening on port: ' + PORT)
})
