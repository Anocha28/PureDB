import { 
    SEASON_CREATE_FAIL,
    SEASON_CREATE_REQUEST,
    SEASON_CREATE_RESET,
    SEASON_CREATE_SUCCESS,
    SEASON_DELETE_FAIL,
    SEASON_DELETE_REQUEST,
    SEASON_DELETE_RESET,
    SEASON_DELETE_SUCCESS,
    SEASON_EDIT_FAIL,
    SEASON_EDIT_REQUEST,
    SEASON_EDIT_RESET,
    SEASON_EDIT_SUCCESS,
    SEASON_LIST_ALL_FAIL,
    SEASON_LIST_ALL_REQUEST,
    SEASON_LIST_ALL_RESET,
    SEASON_LIST_ALL_SUCCESS,
    SEASON_LIST_FAIL,
    SEASON_LIST_REQUEST, 
    SEASON_LIST_RESET, 
    SEASON_LIST_SUCCESS,
} from '../Constants/seasonConstants'

export const seasonListReducer = (state={seasons:[]}, action) => {
    switch(action.type){
        case SEASON_LIST_REQUEST:
            return {loading: true, seasons: []}
        case SEASON_LIST_SUCCESS:
            return {
                loading: false, 
                seasons: action.payload.seasons,
                page: action.payload.page,
                pages: action.payload.pages
            }            
        case SEASON_LIST_FAIL: 
            return {loading: false, error: action.payload}
        case SEASON_LIST_RESET:
            return {}
        default: return state
    }
}

export const seasonListAllReducer = (state={seasons:[]}, action) => {
    switch(action.type){
        case SEASON_LIST_ALL_REQUEST:
            return {loading: true, seasons: []}
        case SEASON_LIST_ALL_SUCCESS:
            return {loading: false, seasons: action.payload}            
        case SEASON_LIST_ALL_FAIL: 
            return {loading: false, error: action.payload}
        case SEASON_LIST_ALL_RESET:
            return {}
        default: return state
    }
}

export const seasonCreateReducer = (state={}, action) => {
    switch(action.type){
        case SEASON_CREATE_REQUEST:
            return {loading: true}
        case SEASON_CREATE_SUCCESS:
            return {loading: false, success: true}            
        case SEASON_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case SEASON_CREATE_RESET:
            return {}
        default: return state
    }
}

export const seasonDeleteReducer = (state={}, action) => {
    switch(action.type){
        case SEASON_DELETE_REQUEST:
            return {loading: true}
        case SEASON_DELETE_SUCCESS:
            return {loading: false, success: true}            
        case SEASON_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        case SEASON_DELETE_RESET:
            return {}
        default: return state
    }
}

export const seasonEditReducer = (state={}, action) => {
    switch(action.type){
        case SEASON_EDIT_REQUEST:
            return {loading: true}
        case SEASON_EDIT_SUCCESS:
            return {loading: false, success: true}            
        case SEASON_EDIT_FAIL: 
            return {loading: false, error: action.payload}
        case SEASON_EDIT_RESET:
            return {}
        default: return state
    }
}