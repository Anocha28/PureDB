import axios from 'axios'
import { 
    FABRIC_CREATE_FAIL,
    FABRIC_CREATE_REQUEST, 
    FABRIC_CREATE_SUCCESS, 
    FABRIC_DELETE_FAIL, 
    FABRIC_DELETE_REQUEST, 
    FABRIC_DELETE_SUCCESS, 
    FABRIC_EDIT_FAIL, 
    FABRIC_EDIT_REQUEST, 
    FABRIC_EDIT_SUCCESS, 
    FABRIC_LIST_ALL_FAIL, 
    FABRIC_LIST_ALL_REQUEST, 
    FABRIC_LIST_ALL_SUCCESS, 
    FABRIC_LIST_FAIL, 
    FABRIC_LIST_REQUEST, 
    FABRIC_LIST_SUCCESS,

} from '../Constants/fabricConstants'



export const listFabric = (keyword = '', pageNumber = '', perPage='', sortBy='') => async (dispatch, getState) => {
    try {
        dispatch({
            type: FABRIC_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/fabrics?keyword=${keyword}&pageNumber=${pageNumber}&perPage=${perPage}&sortBy=${sortBy}`, config)
        dispatch({
            type: FABRIC_LIST_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: FABRIC_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const listAllFabric = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FABRIC_LIST_ALL_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/fabrics/all`, config)
        dispatch({
            type: FABRIC_LIST_ALL_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: FABRIC_LIST_ALL_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createFabric = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FABRIC_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/fabrics', data, config)
        dispatch({
            type: FABRIC_CREATE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: FABRIC_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteFabric = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FABRIC_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/fabrics/${id}`, config)
        dispatch({
            type: FABRIC_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: FABRIC_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const editFabric = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FABRIC_EDIT_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',           
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.put(`/api/fabrics/${id}`, data, config)        
        dispatch({
            type: FABRIC_EDIT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: FABRIC_EDIT_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}