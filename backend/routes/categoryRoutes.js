import express from "express";
const router = express.Router()
import {
    getCategories,
    createCategory,
    deleteCategory,
    editCategory,
    getAllCategories,
} from '../controllers/categoryController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/')
        .get(protect, getCategories)
        .post(protect, createCategory)
router.route('/all')
        .get(protect, getAllCategories)
router.route('/:id')
        .delete(protect, deleteCategory)
        .put(protect, editCategory)

export default router