import asyncHandler from 'express-async-handler'
import Category from '../Models/categoryModel.js'


//@dec      Fetch all category
//@route    GET /api/categories
//@access   Private
const getCategories = asyncHandler (async (req, res) => {
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

    const count = await Category.countDocuments({...keyword})
    const categories = await Category.find({...keyword}).limit(qtyPerPage).skip(qtyPerPage * (page - 1)).sort({[sortBy] : -1})
    res.json({categories, page, pages: Math.ceil(count / qtyPerPage)})
})

//@dec      Fetch all category for style
//@route    GET /api/categories/all
//@access   Private
const getAllCategories = asyncHandler (async (req, res) => {
    const categories = await Category.find({})
    if(categories){
        res.status(200).json(categories)
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
    
})

//@dec      Create a category
//@route    POST /api/categories
//@access   Private
const createCategory = asyncHandler( async (req, res) => {   
    const {code, name, description, mainCategory, customCode, customDescription} = req.body
    const categoryExist = await Category.findOne({code})
    if(categoryExist){
        res.status(400)
        throw new Error('This category code is already in used.')
    }

    const category = await Category.create({
        code,
        name,
        description,
        mainCategory,
        customCode,
        customDescription,
    })

    if(category) {
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})


//@dec      Delete a category
//@route    DELETE /api/categories/:id
//@access   Private
const deleteCategory = asyncHandler( async (req, res) => {       
    const category = await Category.findById(req.params.id)
    if(category) {
        await category.remove()
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})

//@dec      Edit a category
//@route    PUT /api/categories/:id
//@access   Private
const editCategory = asyncHandler( async (req, res) => {   
    const {code, name, description, mainCategory, customCode, customDescription} = req.body
    const category = await Category.findById(req.params.id)
    if(category){
        category.code = code,
        category.name = name,
        category.description = description,
        category.mainCategory = mainCategory,
        category.customCode = customCode,
        category.customDescription = customDescription,
        await category.save()
        res.json('success')
    } else {
        res.status(400)
        throw new Error('Category not found.')
    }
})

export {
    getCategories,
    createCategory,
    deleteCategory,
    editCategory,
    getAllCategories,
}