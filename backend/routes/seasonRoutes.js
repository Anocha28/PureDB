import express from "express";
const router = express.Router()
import {
    getSeasons,
    createSeason,
    deleteSeason,
    editSeason,
    getAllSeasons,
} from '../controllers/seasonController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/')
        .get(protect, getSeasons)
        .post(protect, createSeason)
router.route('/all')
        .get(protect, getAllSeasons)
router.route('/:id')
        .delete(protect, deleteSeason)
        .put(protect, editSeason)

export default router