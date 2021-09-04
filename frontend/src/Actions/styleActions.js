import axios from 'axios'
import { 
    STYLE_BY_ID_FAIL,
    STYLE_BY_ID_REQUEST,
    STYLE_BY_ID_SUCCESS,
    STYLE_CODE_FAIL,
    STYLE_CODE_REQUEST,
    STYLE_CODE_SUCCESS,
    STYLE_CREATE_FAIL,
    STYLE_CREATE_REQUEST, 
    STYLE_CREATE_SUCCESS, 
    STYLE_DELETE_FAIL, 
    STYLE_DELETE_REQUEST, 
    STYLE_DELETE_SUCCESS, 
    STYLE_EDIT_FAIL, 
    STYLE_EDIT_REQUEST, 
    STYLE_EDIT_SUCCESS, 
    STYLE_LIST_ALL_FAIL, 
    STYLE_LIST_ALL_REQUEST, 
    STYLE_LIST_ALL_SUCCESS, 
    STYLE_LIST_FAIL, 
    STYLE_LIST_REQUEST, 
    STYLE_LIST_SUCCESS,

} from '../Constants/styleConstants'



export const listStyle = (keyword = '', pageNumber = '', perPage='', sortBy='') => async (dispatch, getState) => {
    try {
        dispatch({
            type: STYLE_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/styles?keyword=${keyword}&pageNumber=${pageNumber}&perPage=${perPage}&sortBy=${sortBy}`, config)
        dispatch({
            type: STYLE_LIST_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: STYLE_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const listAllStyle =  () => async (dispatch, getState) => {
    try {
        dispatch({
            type: STYLE_LIST_ALL_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/styles/all`, config)
        dispatch({
            type: STYLE_LIST_ALL_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: STYLE_LIST_ALL_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const getByIdStyle =  (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STYLE_BY_ID_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get(`/api/styles/${id}`, config)
        dispatch({
            type: STYLE_BY_ID_SUCCESS,
            payload: data
        })
                
    } catch (error) {
        dispatch({
            type: STYLE_BY_ID_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createStyle =  (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STYLE_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/styles', formData, config)
        dispatch({
            type: STYLE_CREATE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: STYLE_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteStyle =  (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STYLE_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/styles/${id}`, config)
        dispatch({
            type: STYLE_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: STYLE_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const editStyle =  (id, formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STYLE_EDIT_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data',           
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        await axios.put(`/api/styles/${id}`, formData, config)        
        dispatch({
            type: STYLE_EDIT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: STYLE_EDIT_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const getCode =  () => async (dispatch, getState) => {
    try {
        dispatch({
            type: STYLE_CODE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.get('/api/styles/code', config)
        dispatch({
            type: STYLE_CODE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: STYLE_CODE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}