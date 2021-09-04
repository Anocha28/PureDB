import asyncHandler from 'express-async-handler'
import { unlinkSync } from 'fs';
import Brand from '../Models/brandModel.js'


//@dec      Fetch all brand
//@route    GET /api/brands
//@access   Private
const getBrands = asyncHandler (async (req, res) => {
    const brands = await Brand.find({})
    res.json(brands)
})

//@dec      Create a brand
//@route    POST /api/brands
//@access   Private
const createBrand = asyncHandler( async (req, res) => {
    const {name} = req.body
    const logo = req.file.path
    const brandExist = await Brand.findOne({name})
   if(brandExist){
       res.status(400)
       throw new Error('This brand name is already in used.')
   }

   const brand = await Brand.create({
       name,
       logo,
   })

   if(brand) {
       res.status(201).json('Success')
   } else {
       res.status(400)
       throw new Error('Invalid data.')
   }
})

//@dec      Update a brand
//@route    PUT /api/brands/:id
//@access   Private
const editBrand = asyncHandler(async (req, res)=> {
    const brand = await Brand.findById(req.params.id)
    
    if(brand){
        if(req.file){
            try {
                unlinkSync(brand.logo)
            } catch (error) {
                res.status(400)
                throw new Error('File not found.')
            }
            brand.name = req.body.name
            brand.logo = req.file.path
            await brand.save()
            res.json('Success')
        } else {
            brand.name = req.body.name
            brand.logo = req.body.logo
            await brand.save()
            res.json('Success')
        }


    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})

//@dec      delete a brand
//@route    DELETE /api/brands/:id
//@access   Private
const deleteBrand = asyncHandler (async (req, res) => {
    
    const brand = await Brand.findById(req.params.id)

    if(brand){        
        try {
            unlinkSync(brand.logo)
        } catch (error) {
            res.status(400)
            throw new Error('File not found.')
        }
        await brand.remove()
        res.json('Success')
    } else {
        res.status(404)
        throw new Error('Something went wrong.')
    }
})


export {
    getBrands,
    createBrand,
    editBrand,
    deleteBrand,
}