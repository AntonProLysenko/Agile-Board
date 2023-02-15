//mongoose conection

require('dotenv').config();
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect (process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})


  db.on('open', () => console.log('Connected to Mongoose '+ db.name + ' on port ' + db.port+ ' at host ' + db.host))
  db.on('close', () => console.log('Disconnected from Mongoose'))
  db.on('error', (error) => console.log(error));

module.exports = mongoose;
