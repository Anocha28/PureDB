import express from "express";
const router = express.Router()
import {
    getBrands,
    createBrand,
    editBrand,
    deleteBrand,
} from '../controllers/brandController.js'
import {protect} from '../middleware/authMiddleware.js'
import {brandUpload} from '../middleware/imageUpload.js'


router.route('/')
        .get( getBrands)
        .post(protect, brandUpload.single('files'), createBrand)
router.route('/:id')
        .put(protect, brandUpload.single('files'), editBrand)
        .delete(protect, deleteBrand)


export default router