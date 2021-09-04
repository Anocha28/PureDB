import express from "express";
const router = express.Router()
import {
    getStories,
    createStory,
    deleteStory,
    editStory,
    getAllStories,
} from '../controllers/storyController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/')
        .get(protect, getStories)
        .post(protect, createStory)
router.route('/all')
        .get(protect, getAllStories)
router.route('/:id')
        .delete(protect, deleteStory)
        .put(protect, editStory)

export default router