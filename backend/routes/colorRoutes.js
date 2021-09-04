import express from "express";
const router = express.Router()
import {
    getColors,
    createColor,
    deleteColor,
    editColor,
    getColorsExport,
} from '../controllers/colorController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/')
        .get(protect, getColors)
        .post(protect, createColor)
router.route('/all').get(protect, getColorsExport)
router.route('/:id')
        .delete(protect, deleteColor)
        .put(protect, editColor)

export default router