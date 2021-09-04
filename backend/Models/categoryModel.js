import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    mainCategory: {
        type: String,
        required: true,
    },
    customCode: {
        type: String,
        required: true,
    },
    customDescription: {
        type: String,
        required: true,
    },
},{
    timestamps: true
})


const Category = mongoose.model('Category', categorySchema)

export default Category