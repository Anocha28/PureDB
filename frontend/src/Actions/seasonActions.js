import axios from 'axios'
import { 
    SEASON_CREATE_FAIL,
    SEASON_CREATE_REQUEST, 
    SEASON_CREATE_SUCCESS, 
    SEASON_DELETE_FAIL, 
    SEASON_DELETE_REQUEST, 
    SEASON_DELETE_SUCCESS, 
    SEASON_EDIT_FAIL, 
    SEASON_EDIT_REQUEST, 
    SEASON_EDIT_SUCCESS, 
    SEASON_LIST_ALL_FAIL, 
    SEASON_LIST_ALL_REQUEST, 
    SEASON_LIST_ALL_SUCCESS, 
    SEASON_LIST_FAIL, 
    SEASON_LIST_REQUEST, 
    SEASON_LIST_SUCCESS,

} from '../Constants/seasonConstants'



export const listSeason = (keyword = '', pageNumber = '', perPage='', sortBy='') => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEASON_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/seasons?keyword=${keyword}&pageNumber=${pageNumber}&perPage=${perPage}&sortBy=${sortBy}`, config)
        dispatch({
            type: SEASON_LIST_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: SEASON_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const listAllSeason = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEASON_LIST_ALL_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/seasons/all`, config)
        dispatch({
            type: SEASON_LIST_ALL_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: SEASON_LIST_ALL_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createSeason = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEASON_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/seasons', data, config)
        dispatch({
            type: SEASON_CREATE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: SEASON_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteSeason = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEASON_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/seasons/${id}`, config)
        dispatch({
            type: SEASON_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: SEASON_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const editSeason = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEASON_EDIT_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',           
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.put(`/api/seasons/${id}`, data, config)        
        dispatch({
            type: SEASON_EDIT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: SEASON_EDIT_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}