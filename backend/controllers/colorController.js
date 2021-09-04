import asyncHandler from 'express-async-handler'
import Color from '../Models/colorModel.js'


//@dec      Fetch all color
//@route    GET /api/colors
//@access   Private
const getColors = asyncHandler (async (req, res) => {
    const qtyPerPage = Number(req.query.perPage) || 20
    const page = Number(req.query.pageNumber) || 1
    const sortBy = req.query.sortBy || 'createdAt'
    const keyword = req.query.keyword ? {
        $or: [ 
            { code : { $regex: req.query.keyword, $options: 'i' }}, 
            { name : { $regex: req.query.keyword, $options: 'i' }}, 
            { map : { $regex: req.query.keyword, $options: 'i' }} 
        ]        
    } : {}

    const count = await Color.countDocuments({...keyword})
    const colors = await Color.find({...keyword}).limit(qtyPerPage).skip(qtyPerPage * (page - 1)).sort({[sortBy] : -1})
    res.json({colors, page, pages: Math.ceil(count / qtyPerPage)})
})

//@dec      Fetch all color for style
//@route    GET /api/colors/all
//@access   Private
const getColorsExport = asyncHandler (async (req, res) => {
    const colors = await Color.find({})
    if(colors){
        res.status(200).json(colors)
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
    
})

//@dec      Create a color
//@route    POST /api/colors
//@access   Private
const createColor = asyncHandler( async (req, res) => {   
    const {code, name, map} = req.body
    const colorExist = await Color.findOne({code})
    if(colorExist){
        res.status(400)
        throw new Error('This color code is already in used.')
    }

    const color = await Color.create({
        code,
        name,
        map,
    })

    if(color) {
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})


//@dec      Delete a color
//@route    DELETE /api/colors/:id
//@access   Private
const deleteColor = asyncHandler( async (req, res) => {       
    const color = await Color.findById(req.params.id)
    if(color) {
        await color.remove()
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})

//@dec      Edit a color
//@route    PUT /api/colors/:id
//@access   Private
const editColor = asyncHandler( async (req, res) => {   
    const {code, name, map} = req.body
    const color = await Color.findById(req.params.id)
    if(color){
        color.code = code,
        color.name = name,
        color.map = map,
        await color.save()
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Color not found.')
    }
})

//@dec      data rerun for date
//@route    PUT /api/colors/rerun
//@access   Private
const reRunColor = asyncHandler( async (req, res) => {   
   
    const colors = await Color.find({})
    if(colors){
        try {
            colors.forEach(c => {
                c.code = c.code,
                c.name = c.name,
                c.save()
            })
            
         res.json('success')
        } catch (error) {
            throw new Error(error)
        }
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Color not found.')
    }
})





export {
    getColors,
    createColor,
    deleteColor,
    editColor,
    reRunColor,
    getColorsExport,
}