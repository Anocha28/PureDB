import mongoose from 'mongoose'

const fabricSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    instruction: {
        type: String,
        required: true,
    },
 
},{
    timestamps: true
})


const Fabric = mongoose.model('Fabric', fabricSchema)

export default Fabric