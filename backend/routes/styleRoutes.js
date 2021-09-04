import express from "express";
const router = express.Router()
import {
    getStyles,
    getStyleById,
    createStyle,
    deleteStyle,
    editStyle,
    getAllStyles,
    getStyleCode,
} from '../controllers/styleController.js'
import {protect} from '../middleware/authMiddleware.js'
import {styleUpload} from '../middleware/imageUpload.js'


router.route('/')
        .get(protect, getStyles)
        .post(protect, styleUpload.single('files'), createStyle)
router.route('/all')
        .get(protect, getAllStyles)
router.route('/code')
        .get(protect, getStyleCode)
router.route('/:id')
        .get(protect, getStyleById)
        .delete(protect, deleteStyle)
        .put(protect, styleUpload.single('files'), editStyle)

export default router