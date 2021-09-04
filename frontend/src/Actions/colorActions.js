import axios from 'axios'
import { 
    COLOR_CREATE_FAIL,
    COLOR_CREATE_REQUEST, 
    COLOR_CREATE_SUCCESS, 
    COLOR_DELETE_FAIL, 
    COLOR_DELETE_REQUEST, 
    COLOR_DELETE_SUCCESS, 
    COLOR_EDIT_FAIL, 
    COLOR_EDIT_REQUEST, 
    COLOR_EDIT_SUCCESS, 
    COLOR_LIST_ALL_FAIL, 
    COLOR_LIST_ALL_REQUEST, 
    COLOR_LIST_ALL_SUCCESS, 
    COLOR_LIST_FAIL, 
    COLOR_LIST_REQUEST, 
    COLOR_LIST_SUCCESS,

} from '../Constants/colorConstants'



export const listColor = (keyword = '', pageNumber = '', perPage='', sortBy = '') => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/colors?keyword=${keyword}&pageNumber=${pageNumber}&perPage=${perPage}&sortBy=${sortBy}`, config)
        dispatch({
            type: COLOR_LIST_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: COLOR_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const listAllColor = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_LIST_ALL_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/colors/all`, config)
        dispatch({
            type: COLOR_LIST_ALL_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: COLOR_LIST_ALL_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createColor = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/colors', data, config)
        dispatch({
            type: COLOR_CREATE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: COLOR_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteColor = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/colors/${id}`, config)
        dispatch({
            type: COLOR_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: COLOR_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const editColor = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_EDIT_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',           
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.put(`/api/colors/${id}`, data, config)        
        dispatch({
            type: COLOR_EDIT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: COLOR_EDIT_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}