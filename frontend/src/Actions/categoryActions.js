import axios from 'axios'
import { 
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST, 
    CATEGORY_CREATE_SUCCESS, 
    CATEGORY_DELETE_FAIL, 
    CATEGORY_DELETE_REQUEST, 
    CATEGORY_DELETE_SUCCESS, 
    CATEGORY_EDIT_FAIL, 
    CATEGORY_EDIT_REQUEST, 
    CATEGORY_EDIT_SUCCESS, 
    CATEGORY_LIST_ALL_FAIL, 
    CATEGORY_LIST_ALL_REQUEST, 
    CATEGORY_LIST_ALL_SUCCESS, 
    CATEGORY_LIST_FAIL, 
    CATEGORY_LIST_REQUEST, 
    CATEGORY_LIST_SUCCESS,

} from '../Constants/categoryConstants'



export const listCategory = (keyword = '', pageNumber = '', perPage='', sortBy='') => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/categories?keyword=${keyword}&pageNumber=${pageNumber}&perPage=${perPage}&sortBy=${sortBy}`, config)
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const listAllCategory = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_LIST_ALL_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/categories/all`, config)
        dispatch({
            type: CATEGORY_LIST_ALL_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_ALL_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createCategory = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/categories', data, config)
        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/categories/${id}`, config)
        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const editCategory = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_EDIT_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',           
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.put(`/api/categories/${id}`, data, config)        
        dispatch({
            type: CATEGORY_EDIT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_EDIT_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}