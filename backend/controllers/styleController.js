import asyncHandler from 'express-async-handler'
import { unlinkSync } from 'fs';
import Style from '../Models/styleModel.js'


//@dec      Fetch style
//@route    GET /api/styles
//@access   Private
const getStyles = asyncHandler (async (req, res) => {
    
    const qtyPerPage = Number(req.query.perPage) || 20
    const page = Number(req.query.pageNumber) || 1
    const sortBy = req.query.sortBy || "createdAt"
    const keyword = req.query.keyword ? {
        $or: [ 
            { code : { $regex: req.query.keyword, $options: 'i' }}, 
            { name : { $regex: req.query.keyword, $options: 'i' }}, 
        ]        
    } : {}

    const count = await Style.countDocuments({...keyword})
    const styles = await Style
        .find({...keyword})
        .limit(qtyPerPage)
        .skip(qtyPerPage * (page - 1))
        .sort({[sortBy] : -1})
        .populate('user', 'name')
        .populate('brand', 'name')
        .populate({path: 'mainFabric', select: ['code', 'name', 'content']})
        .populate({path: 'subFabric1', select: ['code', 'name', 'content']})
        .populate({path: 'subFabric2', select: ['code', 'name', 'content']})
        .populate({path: 'category', select: ['code', 'name', 'mainCategory']})
        .populate('vendor', 'name')
        .populate({path: 'seasons', select: ['code', 'name', 'start', 'end']})
        .populate({path: 'stories', select: ['code', 'name']})
        .populate({path: 'colors', select: ['code', 'name', 'map']})
    res.status(200).json({styles, page, pages: Math.ceil(count / qtyPerPage)})
})

//@dec      Fetch all style
//@route    GET /api/styles/all
//@access   Private
const getAllStyles = asyncHandler (async (req, res) => {    
    const styles = await Style
        .find({})
        .sort({createdAt: -1})
        .populate('user', 'name')
        .populate('brand', 'name')
        .populate({path: 'mainFabric', select: ['code', 'name', 'content']})
        .populate({path: 'subFabric1', select: ['code', 'name', 'content']})
        .populate({path: 'subFabric2', select: ['code', 'name', 'content']})
        .populate({path: 'category', select: ['code', 'name', 'mainCategory']})
        .populate('vendor', 'name')
        .populate({path: 'seasons', select: ['code', 'name', 'start', 'end']})
        .populate({path: 'stories', select: ['code', 'name']})
        .populate({path: 'colors', select: ['code', 'name', 'map']})
    if(styles) {
        res.status(200).json(styles)
    } else {
        res.status(400)
        throw new Error('Invalid request')
    }    
})

//@dec      Fetch a style by id
//@route    GET /api/styles/id
//@access   Private
const getStyleById = asyncHandler (async (req, res) => {    
    const style = await Style
        .findById(req.params.id)
        .populate('user', 'name')
        .populate('brand', 'name')
        .populate({path: 'mainFabric', select: ['code', 'name', 'content']})
        .populate({path: 'subFabric1', select: ['code', 'name', 'content']})
        .populate({path: 'subFabric2', select: ['code', 'name', 'content']})
        .populate({path: 'category', select: ['code', 'name', 'mainCategory']})
        .populate('vendor', 'name')
        .populate({path: 'seasons', select: ['code', 'name', 'start', 'end']})
        .populate({path: 'stories', select: ['code', 'name']})
        .populate({path: 'colors', select: ['code', 'name', 'map']})
    if(style) {
        res.status(200).json(style)
    } else {
        res.status(400)
        throw new Error('Invalid request, style not found.')
    }    
})

//@dec      Create a style
//@route    POST /api/styles
//@access   Private
const createStyle = asyncHandler( async (req, res) => {
    
    const user = req.user._id
    const image = req.file ? req.file.path : ''

    const name = req.body.name
    const code = req.body.code
    const corporate = req.body.corporate
    const fitCategory = req.body.fitCategory
    const sleeveLength = req.body.sleeveLength
    const garmentLength = req.body.garmentLength
    const pantLength = req.body.pantLength
    const hsp = req.body.hsp ? req.body.hsp : 0
    const pantInseam = req.body.pantInseam ? req.body.pantInseam : 0
    const shortDescription = req.body.shortDescription
    const longDescription = req.body.longDescription
    const weight = req.body.weight ? req.body.weight : 0
    const coo = req.body.coo
    const storyNumber = req.body.storyNumber ? req.body.storyNumber : 0
    const storySortNumber = req.body.storySortNumber ? req.body.storySortNumber : 0
    const uswRegular = req.body.uswRegular ? req.body.uswRegular : 0
    const uswPlus = req.body.uswPlus ? req.body.uswPlus : 0
    const cawRegular = req.body.cawRegular ? req.body.cawRegular : 0
    const cawPlus = req.body.cawPlus ? req.body.cawPlus : 0
    const usaRegular = req.body.usaRegular ? req.body.usaRegular : 0
    const usaPlus = req.body.usaPlus ? req.body.usaPlus : 0
    const caaRegular = req.body.caaRegular ? req.body.caaRegular : 0
    const caaPlus = req.body.caaPlus ? req.body.caaPlus : 0
    const priceNote = req.body.priceNote
    
    const brand = req.body.brand ? req.body.brand : null
    const mainFabric = req.body.mainFabric ? req.body.mainFabric : null
    const subFabric1 = req.body.subFabric1 ? req.body.subFabric1 : null
    const subFabric2 = req.body.subFabric2 ? req.body.subFabric2 : null
    const vendor = req.body.vendor ? req.body.vendor : null
    const category = req.body.category ? req.body.category : null
    const seasons = req.body.seasons && req.body.seasons.split(',')
    const stories = req.body.stories && req.body.stories.split(',')
    const colors = req.body.colors && req.body.colors.split(',')
    const sizes = req.body.sizes && req.body.sizes.split(',')
    
    const styleExist = await Style.findOne({code})
    if(styleExist){
       res.status(400)
       throw new Error('This style code is already in used.')
    }

    const style = await Style.create({
        user,
        image,
        name,
        code,
        corporate,
        fitCategory,
        sleeveLength,
        garmentLength,
        pantLength,
        hsp,
        pantInseam,
        shortDescription,
        longDescription,
        weight,
        coo,
        storyNumber,
        storySortNumber,
        uswRegular,
        uswPlus,
        cawRegular,
        cawPlus,
        usaRegular,
        usaPlus,
        caaRegular,
        caaPlus,
        priceNote,
        brand,
        mainFabric,
        subFabric1,
        subFabric2,
        category,
        vendor,
        seasons,
        stories,
        colors,
        sizes,
    })

   if(style) {
       res.status(201).json('Success')
   } else {
       res.status(400)
       throw new Error('Invalid data.')
   }
})

//@dec      Update a style
//@route    PUT /api/styles/:id
//@access   Private
const editStyle = asyncHandler(async (req, res)=> {
    const style = await Style.findById(req.params.id)    
   
    if(style){
        if(req.file){      
            if(style.image){unlinkSync(style.image)}     
            style.image = req.file.path
        } else {
            style.image = await req.body.image            
        }
        style.user = await req.user._id
        style.name = await req.body.name
        style.code = await req.body.code 
        style.corporate = await req.body.corporate
        style.fitCategory = await req.body.fitCategory
        style.sleeveLength = await req.body.sleeveLength
        style.garmentLength = await req.body.garmentLength
        style.pantLength = await req.body.pantLength
        style.hsp = await req.body.hsp
        style.pantInseam = await req.body.pantInseam
        style.shortDescription = await req.body.shortDescription
        style.longDescription = await req.body.longDescription
        style.weight = await req.body.weight
        style.coo = await req.body.coo
        style.storyNumber = await req.body.storyNumber
        style.storySortNumber = await req.body.storySortNumber
        style.uswRegular = await req.body.uswRegular
        style.uswPlus = await req.body.uswPlus
        style.cawRegular = await req.body.cawRegular
        style.cawPlus = await req.body.cawPlus
        style.usaRegular = await req.body.usaRegular
        style.usaPlus = await req.body.usaPlus
        style.caaRegular = await req.body.caaRegular
        style.caaPlus = await req.body.caaPlus
        style.priceNote = await req.body.priceNote
        style.brand = await req.body.brand ? req.body.brand : null
        style.mainFabric = await req.body.mainFabric ? req.body.mainFabric : null
        style.subFabric1 = await req.body.subFabric1 ? req.body.subFabric1 : null
        style.subFabric2 = await req.body.subFabric2 ? req.body.subFabric2 : null
        style.category = await req.body.category ? req.body.category : null
        style.vendor = await req.body.vendor ? req.body.vendor : null
        style.seasons = await req.body.seasons && req.body.seasons.split(',')
        style.stories = await req.body.stories && req.body.stories.split(',')
        style.colors = await req.body.colors && req.body.colors.split(',')
        style.sizes = await req.body.sizes && req.body.sizes.split(',')

        await style.save()
        res.status(200).json('Success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})

//@dec      delete a style
//@route    DELETE /api/styles/:id
//@access   Private
const deleteStyle = asyncHandler (async (req, res) => {
    
    const style = await Style.findById(req.params.id)

    if(style){        
        if(style.image) {
            unlinkSync(style.image)
        }
        await style.remove()
        res.status(200).json('Success')
    } else {
        res.status(404)
        throw new Error('Something went wrong.')
    }
})

//@dec      get style number for new style
//@route    GET /api/styles/code
//@access   Private
const getStyleCode = asyncHandler (async (req, res) => {
    
    const styles = await Style.find({}).sort({code: -1})

    if(styles){
        const styleNum = Number(styles[0].code) + 1
        res.status(200).json(styleNum)
    } else {
        res.status(404)
        throw new Error('Something went wrong.')
    }
})


export {
    getStyles,
    getStyleById,
    getAllStyles,
    createStyle,
    editStyle,
    deleteStyle,
    getStyleCode,
}