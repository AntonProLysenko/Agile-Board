require('dotenv').config();
const express = require('express')
const app = express ();
cors = require ('cors')
const PORT = process.env.PORT || 3000

//Midlware
app.use(cors())
app.use(express.json())




app.listen(PORT,()=>{
    console.log('Listening on port: ' + PORT)
})
