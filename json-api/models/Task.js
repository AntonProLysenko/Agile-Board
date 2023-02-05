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
      enum: ["TO-DO", "PENDING", "COMPLETED"], //limiting status properties only to alocated values
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Task', taskSchema)