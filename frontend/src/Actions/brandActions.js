import axios from 'axios'
import { 
    BRAND_CREATE_REQUEST,
    BRAND_CREATE_SUCCESS,
    BRAND_CREATE_FAIL,
    BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
    BRAND_EDIT_REQUEST,
    BRAND_EDIT_SUCCESS,
    BRAND_EDIT_FAIL,
    BRAND_DELETE_REQUEST,
    BRAND_DELETE_SUCCESS,
    BRAND_DELETE_FAIL,
    
} from '../Constants/brandConstants'


export const listBrand = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: BRAND_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get('/api/brands', config)
        dispatch({
            type: BRAND_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: BRAND_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createBrand = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BRAND_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data',              
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/brands', formData, config)
        dispatch({
            type: BRAND_CREATE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: BRAND_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const editBrand = (id, formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BRAND_EDIT_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data',           
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.put(`/api/brands/${id}`, formData, config)        
        dispatch({
            type: BRAND_EDIT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: BRAND_EDIT_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteBrand = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BRAND_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {          
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.delete(`/api/brands/${id}`, config)        
        dispatch({
            type: BRAND_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: BRAND_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

