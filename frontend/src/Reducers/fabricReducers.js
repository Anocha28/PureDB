import { 
    FABRIC_CREATE_FAIL,
    FABRIC_CREATE_REQUEST,
    FABRIC_CREATE_RESET,
    FABRIC_CREATE_SUCCESS,
    FABRIC_DELETE_FAIL,
    FABRIC_DELETE_REQUEST,
    FABRIC_DELETE_RESET,
    FABRIC_DELETE_SUCCESS,
    FABRIC_EDIT_FAIL,
    FABRIC_EDIT_REQUEST,
    FABRIC_EDIT_RESET,
    FABRIC_EDIT_SUCCESS,
    FABRIC_LIST_ALL_FAIL,
    FABRIC_LIST_ALL_REQUEST,
    FABRIC_LIST_ALL_RESET,
    FABRIC_LIST_ALL_SUCCESS,
    FABRIC_LIST_FAIL,
    FABRIC_LIST_REQUEST, 
    FABRIC_LIST_RESET, 
    FABRIC_LIST_SUCCESS,
} from '../Constants/fabricConstants'

export const fabricListReducer = (state={fabrics:[]}, action) => {
    switch(action.type){
        case FABRIC_LIST_REQUEST:
            return {loading: true, fabrics: []}
        case FABRIC_LIST_SUCCESS:
            return {
                loading: false, 
                fabrics: action.payload.fabrics,
                page: action.payload.page,
                pages: action.payload.pages
            }            
        case FABRIC_LIST_FAIL: 
            return {loading: false, error: action.payload}
        case FABRIC_LIST_RESET:
            return {}
        default: return state
    }
}

export const fabricListAllReducer = (state={fabrics:[]}, action) => {
    switch(action.type){
        case FABRIC_LIST_ALL_REQUEST:
            return {loading: true, fabrics: []}
        case FABRIC_LIST_ALL_SUCCESS:
            return {loading: false, fabrics: action.payload,}            
        case FABRIC_LIST_ALL_FAIL: 
            return {loading: false, error: action.payload}
        case FABRIC_LIST_ALL_RESET:
            return {}
        default: return state
    }
}

export const fabricCreateReducer = (state={}, action) => {
    switch(action.type){
        case FABRIC_CREATE_REQUEST:
            return {loading: true}
        case FABRIC_CREATE_SUCCESS:
            return {loading: false, success: true}            
        case FABRIC_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case FABRIC_CREATE_RESET:
            return {}
        default: return state
    }
}

export const fabricDeleteReducer = (state={}, action) => {
    switch(action.type){
        case FABRIC_DELETE_REQUEST:
            return {loading: true}
        case FABRIC_DELETE_SUCCESS:
            return {loading: false, success: true}            
        case FABRIC_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        case FABRIC_DELETE_RESET:
            return {}
        default: return state
    }
}

export const fabricEditReducer = (state={}, action) => {
    switch(action.type){
        case FABRIC_EDIT_REQUEST:
            return {loading: true}
        case FABRIC_EDIT_SUCCESS:
            return {loading: false, success: true}            
        case FABRIC_EDIT_FAIL: 
            return {loading: false, error: action.payload}
        case FABRIC_EDIT_RESET:
            return {}
        default: return state
    }
}