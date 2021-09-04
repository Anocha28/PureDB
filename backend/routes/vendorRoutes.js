import express from "express";
const router = express.Router()
import {
    getVendors,
    createVendor,
    deleteVendor,
    editVendor,
    getAllVendors,
} from '../controllers/vendorController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/')
        .get(protect, getVendors)
        .post(protect, createVendor)
router.route('/all')
        .get(protect, getAllVendors)
router.route('/:id')
        .delete(protect, deleteVendor)
        .put(protect, editVendor)

export default router