import { 
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_RESET,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_RESET,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_EDIT_FAIL,
    CATEGORY_EDIT_REQUEST,
    CATEGORY_EDIT_RESET,
    CATEGORY_EDIT_SUCCESS,
    CATEGORY_LIST_ALL_FAIL,
    CATEGORY_LIST_ALL_REQUEST,
    CATEGORY_LIST_ALL_RESET,
    CATEGORY_LIST_ALL_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST, 
    CATEGORY_LIST_RESET, 
    CATEGORY_LIST_SUCCESS,
} from '../Constants/categoryConstants'

export const categoryListReducer = (state={categories:[]}, action) => {
    switch(action.type){
        case CATEGORY_LIST_REQUEST:
            return {loading: true, categories: []}
        case CATEGORY_LIST_SUCCESS:
            return {
                loading: false, 
                categories: action.payload.categories,
                page: action.payload.page,
                pages: action.payload.pages
            }            
        case CATEGORY_LIST_FAIL: 
            return {loading: false, error: action.payload}
        case CATEGORY_LIST_RESET:
            return {}
        default: return state
    }
}

export const categoryListAllReducer = (state={categories:[]}, action) => {
    switch(action.type){
        case CATEGORY_LIST_ALL_REQUEST:
            return {loading: true, categories: []}
        case CATEGORY_LIST_ALL_SUCCESS:
            return {loading: false, categories: action.payload}            
        case CATEGORY_LIST_ALL_FAIL: 
            return {loading: false, error: action.payload}
        case CATEGORY_LIST_ALL_RESET:
            return {}
        default: return state
    }
}

export const categoryCreateReducer = (state={}, action) => {
    switch(action.type){
        case CATEGORY_CREATE_REQUEST:
            return {loading: true}
        case CATEGORY_CREATE_SUCCESS:
            return {loading: false, success: true}            
        case CATEGORY_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case CATEGORY_CREATE_RESET:
            return {}
        default: return state
    }
}

export const categoryDeleteReducer = (state={}, action) => {
    switch(action.type){
        case CATEGORY_DELETE_REQUEST:
            return {loading: true}
        case CATEGORY_DELETE_SUCCESS:
            return {loading: false, success: true}            
        case CATEGORY_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        case CATEGORY_DELETE_RESET:
            return {}
        default: return state
    }
}

export const categoryEditReducer = (state={}, action) => {
    switch(action.type){
        case CATEGORY_EDIT_REQUEST:
            return {loading: true}
        case CATEGORY_EDIT_SUCCESS:
            return {loading: false, success: true}            
        case CATEGORY_EDIT_FAIL: 
            return {loading: false, error: action.payload}
        case CATEGORY_EDIT_RESET:
            return {}
        default: return state
    }
}