import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'

//@dec      Auth user
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler (async (req, res) => {
    const {email , password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password.')
    }
})
 

//@dec      create a new user
//@route    POST /api/users
//@access   Public
const createUser = asyncHandler (async (req, res) => {
    const {name, email , password} = req.body
    const userExists = await User.findOne({email})
   if(userExists){
       res.status(400)
       throw new Error('This email is already in used.')
   }
   const user = await User.create({
       name,
       email,
       password
   })
   if(user) {
       res.status(200).json('Success')
   } else {
       res.status(400)
       throw new Error('Invalid user data.')
   }
})

//@dec      get all users
//@route    GET /api/users
//@access   Private/admin
const getUsers = asyncHandler (async (req, res) => {    
    const users = await User.find({})
    res.json(users)
})

//@dec      delete a user
//@route    DELETE /api/users/:id
//@access   Private/admin
const deleteUser = asyncHandler (async (req, res) => {    
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.status(200).json('Success')
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@dec      update user
//@route    PUT /api/users/:id
//@access   Private/Admin
const updateUser = asyncHandler (async (req, res) => {    
    const user = await User.findById(req.params.id)
    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        user.isAdmin = req.body.isAdmin 
        const updatedUser = await user.save()
        
        if(updatedUser){
            res.status(200).json('Success')
        } else {
            throw new Error('Something went wrong.')
        }
        
    } else {
        res.status(404)
        throw new Error('User not found.')
    }
})



export {
    authUser,
    createUser,
    getUsers,
    deleteUser,
    updateUser,
}