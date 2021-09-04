import asyncHandler from 'express-async-handler'
import Vendor from '../Models/vendorModel.js'


//@dec      Fetch all vendor
//@route    GET /api/vendors
//@access   Private
const getVendors = asyncHandler (async (req, res) => {
    const qtyPerPage = Number(req.query.perPage) || 20
    const page = Number(req.query.pageNumber) || 1
    const sortBy = req.query.sortBy || 'createdAt'
    const keyword = req.query.keyword ? {
        $or: [ 
            { code : { $regex: req.query.keyword, $options: 'i' }}, 
            { name : { $regex: req.query.keyword, $options: 'i' }}
        ]        
    } : {}

    const count = await Vendor.countDocuments({...keyword})
    const vendors = await Vendor.find({...keyword}).limit(qtyPerPage).skip(qtyPerPage * (page - 1)).sort({[sortBy] : -1})
    res.json({vendors, page, pages: Math.ceil(count / qtyPerPage)})
})

//@dec      Fetch all vendor 
//@route    GET /api/vendors/all
//@access   Private
const getAllVendors = asyncHandler (async (req, res) => {
    const vendors = await Vendor.find({})
    if(vendors){
        res.status(200).json(vendors)
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
    
})

//@dec      Create a vendor
//@route    POST /api/vendors
//@access   Private
const createVendor = asyncHandler( async (req, res) => {   
    const {code, name, map} = req.body
    const vendorExist = await Vendor.findOne({code})
    if(vendorExist){
        res.status(400)
        throw new Error('This vendor code is already in used.')
    }

    const vendor = await Vendor.create({
        code,
        name,
    })

    if(vendor) {
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})


//@dec      Delete a vendor
//@route    DELETE /api/vendors/:id
//@access   Private
const deleteVendor = asyncHandler( async (req, res) => {       
    const vendor = await Vendor.findById(req.params.id)
    if(vendor) {
        await vendor.remove()
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})

//@dec      Edit a vendor
//@route    PUT /api/vendors/:id
//@access   Private
const editVendor = asyncHandler( async (req, res) => {   
    const {code, name, map} = req.body
    const vendor = await Vendor.findById(req.params.id)
    if(vendor){
        vendor.code = code,
        vendor.name = name,
        await vendor.save()
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Vendor not found.')
    }
})






export {
    getVendors,
    createVendor,
    deleteVendor,
    editVendor,
    getAllVendors,
}