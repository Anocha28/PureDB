import mongoose from 'mongoose'

const storySchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    season: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Season'
    }, 
},{
    timestamps: true
})


const Story = mongoose.model('Story', storySchema)

export default Story