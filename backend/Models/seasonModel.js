import mongoose from 'mongoose'

const seasonSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true,
    },
 
},{
    timestamps: true
})


const Season = mongoose.model('Season', seasonSchema)

export default Season