const {Schema, model} = require('./connection')

const taskSchema = Schema(
  {
    entry: {
      required: true,
      type: String,
    },
    body: String ,
    
    status: {
      type: String,
      required: true,
      default: "TO-DO",
      enum: ["TO-DO", "PENDING", "COMPLETED", "ARCHIVED"], //limiting status properties only to alocated values
    },
    prevStatus:String,
    user: String,
    board: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Task', taskSchema)