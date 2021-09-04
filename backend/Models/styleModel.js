import mongoose from 'mongoose'

const styleSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    corporate: {
        type: Boolean,
        default: false
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Brand'
    }, 
    mainFabric: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Fabric'
    }, 
    subFabric1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fabric'
    }, 
    subFabric2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fabric'
    }, 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }, 
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },     
    sizes: [String],
    seasons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    }], 
    stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }], 
    colors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    }],
    image: {type: String},
    fitCategory: {type: String},
    sleeveLength: {type: String},
    garmentLength: {type: String},
    pantLength: {type: String},
    hsp: {type: Number, default: 0},
    pantInseam: {type: Number, default: 0},
    shortDescription: {type: String},
    longDescription: {type: String},
    weight: {type: Number, default: 0},
    coo: {type: String},
    storyNumber: {type: Number},
    storySortNumber: {type: Number},
    uswRegular: {type: Number, default: 0},
    uswPlus: {type: Number, default: 0},
    cawRegular: {type: Number, default: 0},
    cawPlus: {type: Number, default: 0},
    usaRegular: {type: Number, default: 0},
    usaPlus: {type: Number, default: 0},
    caaRegular: {type: Number, default: 0},
    caaPlus: {type: Number, default: 0},
    priceNote: {type: String},
    
},{
    timestamps: true
})


const Style = mongoose.model('Style', styleSchema)

export default Style
