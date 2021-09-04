import asyncHandler from 'express-async-handler'
import Story from '../Models/storyModel.js'


//@dec      Fetch all story
//@route    GET /api/stories
//@access   Private
const getStories = asyncHandler (async (req, res) => {
    
    const qtyPerPage = Number(req.query.perPage) || 20
    const page = Number(req.query.pageNumber) || 1
    const sortBy = req.query.sortBy || "createdAt"
    const keyword = req.query.keyword ? {
        $or: [ 
            { code : { $regex: req.query.keyword, $options: 'i' }}, 
            { name : { $regex: req.query.keyword, $options: 'i' }}, 
        ]        
    } : {}

    const count = await Story.countDocuments({...keyword})
    const stories = await Story.find({...keyword}).limit(qtyPerPage).skip(qtyPerPage * (page - 1)).sort({[sortBy] : -1}).populate('season')
    res.json({stories, page, pages: Math.ceil(count / qtyPerPage)})
})


//@dec      Fetch all story 
//@route    GET /api/stories/all
//@access   Private
const getAllStories = asyncHandler (async (req, res) => {
    const stories = await Story.find({})
    if(stories){
        res.status(200).json(stories)
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
    
})


//@dec      Create a story
//@route    POST /api/stories
//@access   Private
const createStory = asyncHandler( async (req, res) => {   
    const {code, name, season} = req.body
    const storyExist = await Story.findOne({code})
    if(storyExist){
        res.status(400)
        throw new Error('This story code is already in used.')
    }

    const story = await Story.create({
        code,
        name,
        season,
    })

    if(story) {
        res.json('Success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})

//@dec      Delete a story
//@route    DELETE /api/stories/:id
//@access   Private
const deleteStory = asyncHandler( async (req, res) => {       
    const story = await Story.findById(req.params.id)
    if(story) {
        await story.remove()
        res.json('Success')
    } else {
        res.status(400)
        throw new Error('Server error, invalid data.')
    }
})

//@dec      Edit a story
//@route    PUT /api/stories/:id
//@access   Private
const editStory = asyncHandler( async (req, res) => {  
    
    const {code, name, season} = req.body
    const story = await Story.findById(req.params.id)
    if(story){
        story.code = code,
        story.name = name,
        story.season = season,
        await story.save()
        res.json('Success')
    } else {
        res.status(400)
        throw new Error('Server error, Story not found.')
    }
})

export {
    getStories,
    createStory,
    deleteStory,
    editStory,
    getAllStories,
}