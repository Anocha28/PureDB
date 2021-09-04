import axios from 'axios'
import { 
    STORY_CREATE_FAIL,
    STORY_CREATE_REQUEST, 
    STORY_CREATE_SUCCESS, 
    STORY_DELETE_FAIL, 
    STORY_DELETE_REQUEST, 
    STORY_DELETE_SUCCESS, 
    STORY_EDIT_FAIL, 
    STORY_EDIT_REQUEST, 
    STORY_EDIT_SUCCESS, 
    STORY_LIST_ALL_FAIL, 
    STORY_LIST_ALL_REQUEST, 
    STORY_LIST_ALL_SUCCESS, 
    STORY_LIST_FAIL, 
    STORY_LIST_REQUEST, 
    STORY_LIST_SUCCESS,

} from '../Constants/storyConstants'



export const listStory = (keyword = '', pageNumber = '', perPage='', sortBy='') => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORY_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/stories?keyword=${keyword}&pageNumber=${pageNumber}&perPage=${perPage}&sortBy=${sortBy}`, config)
        dispatch({
            type: STORY_LIST_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: STORY_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const listAllStory = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORY_LIST_ALL_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/stories/all`, config)
        dispatch({
            type: STORY_LIST_ALL_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: STORY_LIST_ALL_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createStory = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORY_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/stories', data, config)
        dispatch({
            type: STORY_CREATE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: STORY_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteStory = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORY_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/stories/${id}`, config)
        dispatch({
            type: STORY_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: STORY_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const editStory = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORY_EDIT_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',           
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.put(`/api/stories/${id}`, data, config)        
        dispatch({
            type: STORY_EDIT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: STORY_EDIT_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}