import express from "express";
const router = express.Router()
import {
    authUser,
    createUser,
    deleteUser,
    getUsers,
    updateUser,
} from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/')
        .get(protect, admin, getUsers)
        .post(protect, admin, createUser)
router.route('/login')
        .post(authUser)
router.route('/:id')
        .delete(protect, admin, deleteUser)
        .put(protect, admin, updateUser)


export default router