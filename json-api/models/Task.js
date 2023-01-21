const {Schema, model} = reqire('mongoose')

const taskSchema = Schema({
    entry: {
        required: true,
        type: String
      },
    status: {
        type: String,
        required: true,
        default: 'TO-DO',
        enum: ['TO-DO', 'PENDING', 'COMPLETED'],//limiting status properties only to alocated values
        }
    },
      {
        timestamps:true    
})

module.exports = model('Task', taskSchema)