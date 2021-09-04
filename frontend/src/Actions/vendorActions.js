import axios from 'axios'
import { 
    VENDOR_CREATE_FAIL,
    VENDOR_CREATE_REQUEST, 
    VENDOR_CREATE_SUCCESS, 
    VENDOR_DELETE_FAIL, 
    VENDOR_DELETE_REQUEST, 
    VENDOR_DELETE_SUCCESS, 
    VENDOR_EDIT_FAIL, 
    VENDOR_EDIT_REQUEST, 
    VENDOR_EDIT_SUCCESS, 
    VENDOR_LIST_ALL_FAIL, 
    VENDOR_LIST_ALL_REQUEST, 
    VENDOR_LIST_ALL_SUCCESS, 
    VENDOR_LIST_FAIL, 
    VENDOR_LIST_REQUEST, 
    VENDOR_LIST_SUCCESS,

} from '../Constants/vendorConstants'



export const listVendor = (keyword = '', pageNumber = '', perPage='', sortBy='') => async (dispatch, getState) => {
    try {
        dispatch({
            type: VENDOR_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/vendors?keyword=${keyword}&pageNumber=${pageNumber}&perPage=${perPage}&sortBy=${sortBy}`, config)
        dispatch({
            type: VENDOR_LIST_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: VENDOR_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const listAllVendor = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: VENDOR_LIST_ALL_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/vendors/all`, config)
        dispatch({
            type: VENDOR_LIST_ALL_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: VENDOR_LIST_ALL_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createVendor = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VENDOR_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/vendors', data, config)
        dispatch({
            type: VENDOR_CREATE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: VENDOR_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteVendor = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VENDOR_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/vendors/${id}`, config)
        dispatch({
            type: VENDOR_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: VENDOR_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const editVendor = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VENDOR_EDIT_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',           
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.put(`/api/vendors/${id}`, data, config)        
        dispatch({
            type: VENDOR_EDIT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: VENDOR_EDIT_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}