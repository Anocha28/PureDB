import express from "express";
const router = express.Router()
import {
    getFabrics,
    createFabric,
    deleteFabric,
    editFabric,
    getAllFabrics,
} from '../controllers/fabricController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/')
        .get(protect, getFabrics)
        .post(protect, createFabric)
router.route('/all')
        .get(protect, getAllFabrics)
router.route('/:id')
        .delete(protect, deleteFabric)
        .put(protect, editFabric)

export default router