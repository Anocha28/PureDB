import asyncHandler from 'express-async-handler'
import Fabric from '../Models/fabricModel.js'


//@dec      Fetch all fabric
//@route    GET /api/fabrics
//@access   Private
const getFabrics = asyncHandler (async (req, res) => {
    
    const qtyPerPage = Number(req.query.perPage) || 20
    const page = Number(req.query.pageNumber) || 1
    const sortBy = req.query.sortBy || 'createdAt'
    const keyword = req.query.keyword ? {
        $or: [ 
            { code : { $regex: req.query.keyword, $options: 'i' }}, 
            { name : { $regex: req.query.keyword, $options: 'i' }}, 
            { content : { $regex: req.query.keyword, $options: 'i' }},
            { instruction : { $regex: req.query.keyword, $options: 'i' }},
        ]        
    } : {}

    const count = await Fabric.countDocuments({...keyword})
    const fabrics = await Fabric.find({...keyword}).limit(qtyPerPage).skip(qtyPerPage * (page - 1)).sort({[sortBy] : -1})
    res.json({fabrics, page, pages: Math.ceil(count / qtyPerPage)})
})

//@dec      Fetch all fabric for style
//@route    GET /api/fabrics/all
//@access   Private
const getAllFabrics = asyncHandler (async (req, res) => {
    const fabrics = await Fabric.find({})
    if(fabrics){
        res.status(200).json(fabrics)
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
    
})

//@dec      Create a fabric
//@route    POST /api/fabrics
//@access   Private
const createFabric = asyncHandler( async (req, res) => {   
    const {code, name, content, instruction} = req.body
    const fabricExist = await Fabric.findOne({code})
    if(fabricExist){
        res.status(400)
        throw new Error('This fabric code is already in used.')
    }

    const fabric = await Fabric.create({
        code,
        name,
        content,
        instruction,
    })

    if(fabric) {
        res.json('Success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})

//@dec      Delete a fabric
//@route    DELETE /api/fabrics/:id
//@access   Private
const deleteFabric = asyncHandler( async (req, res) => {       
    const fabric = await Fabric.findById(req.params.id)
    if(fabric) {
        await fabric.remove()
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Server error, invalid data.')
    }
})

//@dec      Edit a fabric
//@route    PUT /api/fabrics/:id
//@access   Private
const editFabric = asyncHandler( async (req, res) => {  
    
    const {code, name, content, instruction} = req.body
    const fabric = await Fabric.findById(req.params.id)
    if(fabric){
        fabric.code = code,
        fabric.name = name,
        fabric.content = content,
        fabric.instruction = instruction,
        await fabric.save()
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Server error, Fabric not found.')
    }
})

export {
    getFabrics,
    createFabric,
    deleteFabric,
    editFabric,
    getAllFabrics,
}