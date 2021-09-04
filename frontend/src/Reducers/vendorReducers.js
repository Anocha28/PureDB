import { 
    VENDOR_CREATE_FAIL,
    VENDOR_CREATE_REQUEST,
    VENDOR_CREATE_RESET,
    VENDOR_CREATE_SUCCESS,
    VENDOR_DELETE_FAIL,
    VENDOR_DELETE_REQUEST,
    VENDOR_DELETE_RESET,
    VENDOR_DELETE_SUCCESS,
    VENDOR_EDIT_FAIL,
    VENDOR_EDIT_REQUEST,
    VENDOR_EDIT_RESET,
    VENDOR_EDIT_SUCCESS,
    VENDOR_LIST_ALL_FAIL,
    VENDOR_LIST_ALL_REQUEST,
    VENDOR_LIST_ALL_RESET,
    VENDOR_LIST_ALL_SUCCESS,
    VENDOR_LIST_FAIL,
    VENDOR_LIST_REQUEST, 
    VENDOR_LIST_RESET, 
    VENDOR_LIST_SUCCESS,
} from '../Constants/vendorConstants'

export const vendorListReducer = (state={vendors:[]}, action) => {
    switch(action.type){
        case VENDOR_LIST_REQUEST:
            return {loading: true, vendors: []}
        case VENDOR_LIST_SUCCESS:
            return {
                loading: false, 
                vendors: action.payload.vendors,
                page: action.payload.page,
                pages: action.payload.pages
            }            
        case VENDOR_LIST_FAIL: 
            return {loading: false, error: action.payload}
        case VENDOR_LIST_RESET:
            return {}
        default: return state
    }
}

export const vendorListAllReducer = (state={vendors:[]}, action) => {
    switch(action.type){
        case VENDOR_LIST_ALL_REQUEST:
            return {loading: true, vendors: []}
        case VENDOR_LIST_ALL_SUCCESS:
            return {loading: false, vendors: action.payload}            
        case VENDOR_LIST_ALL_FAIL: 
            return {loading: false, error: action.payload}
        case VENDOR_LIST_ALL_RESET:
            return {}
        default: return state
    }
}

export const vendorCreateReducer = (state={}, action) => {
    switch(action.type){
        case VENDOR_CREATE_REQUEST:
            return {loading: true}
        case VENDOR_CREATE_SUCCESS:
            return {loading: false, success: true}            
        case VENDOR_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case VENDOR_CREATE_RESET:
            return {}
        default: return state
    }
}

export const vendorDeleteReducer = (state={}, action) => {
    switch(action.type){
        case VENDOR_DELETE_REQUEST:
            return {loading: true}
        case VENDOR_DELETE_SUCCESS:
            return {loading: false, success: true}            
        case VENDOR_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        case VENDOR_DELETE_RESET:
            return {}
        default: return state
    }
}

export const vendorEditReducer = (state={}, action) => {
    switch(action.type){
        case VENDOR_EDIT_REQUEST:
            return {loading: true}
        case VENDOR_EDIT_SUCCESS:
            return {loading: false, success: true}            
        case VENDOR_EDIT_FAIL: 
            return {loading: false, error: action.payload}
        case VENDOR_EDIT_RESET:
            return {}
        default: return state
    }
}