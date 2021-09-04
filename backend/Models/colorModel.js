import mongoose from 'mongoose'

const colorSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    map: {
        type: String,
        required: true,
    },
 
},{
    timestamps: true
})


const Color = mongoose.model('Color', colorSchema)

export default Color