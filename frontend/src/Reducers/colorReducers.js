import { 
    COLOR_CREATE_FAIL,
    COLOR_CREATE_REQUEST,
    COLOR_CREATE_RESET,
    COLOR_CREATE_SUCCESS,
    COLOR_DELETE_FAIL,
    COLOR_DELETE_REQUEST,
    COLOR_DELETE_RESET,
    COLOR_DELETE_SUCCESS,
    COLOR_EDIT_FAIL,
    COLOR_EDIT_REQUEST,
    COLOR_EDIT_RESET,
    COLOR_EDIT_SUCCESS,
    COLOR_LIST_ALL_FAIL,
    COLOR_LIST_ALL_REQUEST,
    COLOR_LIST_ALL_RESET,
    COLOR_LIST_ALL_SUCCESS,
    COLOR_LIST_FAIL,
    COLOR_LIST_REQUEST, 
    COLOR_LIST_RESET, 
    COLOR_LIST_SUCCESS,
} from '../Constants/colorConstants'

export const colorListReducer = (state={colors:[]}, action) => {
    switch(action.type){
        case COLOR_LIST_REQUEST:
            return {loading: true, colors: []}
        case COLOR_LIST_SUCCESS:
            return {
                loading: false, 
                colors: action.payload.colors,
                page: action.payload.page,
                pages: action.payload.pages
            }            
        case COLOR_LIST_FAIL: 
            return {loading: false, error: action.payload}
        case COLOR_LIST_RESET:
            return {}
        default: return state
    }
}

export const colorListAllReducer = (state={colors:[]}, action) => {
    switch(action.type){
        case COLOR_LIST_ALL_REQUEST:
            return {loading: true, colors: []}
        case COLOR_LIST_ALL_SUCCESS:
            return {loading: false, colors: action.payload, }            
        case COLOR_LIST_ALL_FAIL: 
            return {loading: false, error: action.payload}
        case COLOR_LIST_ALL_RESET:
            return {}
        default: return state
    }
}

export const colorCreateReducer = (state={}, action) => {
    switch(action.type){
        case COLOR_CREATE_REQUEST:
            return {loading: true}
        case COLOR_CREATE_SUCCESS:
            return {loading: false, success: true}            
        case COLOR_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case COLOR_CREATE_RESET:
            return {}
        default: return state
    }
}

export const colorDeleteReducer = (state={}, action) => {
    switch(action.type){
        case COLOR_DELETE_REQUEST:
            return {loading: true}
        case COLOR_DELETE_SUCCESS:
            return {loading: false, success: true}            
        case COLOR_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        case COLOR_DELETE_RESET:
            return {}
        default: return state
    }
}

export const colorEditReducer = (state={}, action) => {
    switch(action.type){
        case COLOR_EDIT_REQUEST:
            return {loading: true}
        case COLOR_EDIT_SUCCESS:
            return {loading: false, success: true}            
        case COLOR_EDIT_FAIL: 
            return {loading: false, error: action.payload}
        case COLOR_EDIT_RESET:
            return {}
        default: return state
    }
}