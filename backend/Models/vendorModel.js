import mongoose from 'mongoose'

const vendorSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }, 
},{
    timestamps: true
})


const Vendor = mongoose.model('Vendor', vendorSchema)

export default Vendor