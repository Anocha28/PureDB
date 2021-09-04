import asyncHandler from 'express-async-handler'
import Season from '../Models/seasonModel.js'


//@dec      Fetch all season
//@route    GET /api/seasons
//@access   Private
const getSeasons = asyncHandler (async (req, res) => {
    
    const qtyPerPage = Number(req.query.perPage) || 20
    const page = Number(req.query.pageNumber) || 1
    const sortBy = req.query.sortBy || "createdAt"
    const keyword = req.query.keyword ? {
        $or: [ 
            { code : { $regex: req.query.keyword, $options: 'i' }}, 
            { name : { $regex: req.query.keyword, $options: 'i' }}, 
        ]        
    } : {}

    const count = await Season.countDocuments({...keyword})
    const seasons = await Season.find({...keyword}).limit(qtyPerPage).skip(qtyPerPage * (page - 1)).sort({[sortBy] : -1})
    res.json({seasons, page, pages: Math.ceil(count / qtyPerPage)})
})

//@dec      Fetch all season 
//@route    GET /api/seasons/all
//@access   Private
const getAllSeasons = asyncHandler (async (req, res) => {    
    const seasons = await Season.find({}).sort({createdAt: -1})
    if(seasons) {
        res.status(200).json(seasons)
    } else {
        res.status(400)
        throw new Error('Invalid request')
    }    
})

//@dec      Create a season
//@route    POST /api/seasons
//@access   Private
const createSeason = asyncHandler( async (req, res) => {   
    const {code, name, start, end} = req.body
    const seasonExist = await Season.findOne({code})
    if(seasonExist){
        res.status(400)
        throw new Error('This season code is already in used.')
    }

    const season = await Season.create({
        code,
        name,
        start,
        end,
    })

    if(season) {
        res.json('Success')
    } else {
        res.status(400)
        throw new Error('Invalid data.')
    }
})

//@dec      Delete a season
//@route    DELETE /api/seasons/:id
//@access   Private
const deleteSeason = asyncHandler( async (req, res) => {       
    const season = await Season.findById(req.params.id)
    if(season) {
        await season.remove()
        res.json('Success')
    } else {
        res.status(400)
        throw new Error('Server error, invalid data.')
    }
})

//@dec      Edit a season
//@route    PUT /api/seasons/:id
//@access   Private
const editSeason = asyncHandler( async (req, res) => {  
    
    const {code, name, start, end} = req.body
    const season = await Season.findById(req.params.id)
    if(season){
        season.code = code,
        season.name = name,
        season.start = start,
        season.end = end,
        await season.save()
        res.json('Success')
    } else {
        res.status(400)
        throw new Error('Server error, Season not found.')
    }
})

export {
    getSeasons,
    createSeason,
    deleteSeason,
    editSeason,
    getAllSeasons,
}