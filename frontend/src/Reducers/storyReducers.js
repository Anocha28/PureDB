import { 
    STORY_CREATE_FAIL,
    STORY_CREATE_REQUEST,
    STORY_CREATE_RESET,
    STORY_CREATE_SUCCESS,
    STORY_DELETE_FAIL,
    STORY_DELETE_REQUEST,
    STORY_DELETE_RESET,
    STORY_DELETE_SUCCESS,
    STORY_EDIT_FAIL,
    STORY_EDIT_REQUEST,
    STORY_EDIT_RESET,
    STORY_EDIT_SUCCESS,
    STORY_LIST_ALL_FAIL,
    STORY_LIST_ALL_REQUEST,
    STORY_LIST_ALL_RESET,
    STORY_LIST_ALL_SUCCESS,
    STORY_LIST_FAIL,
    STORY_LIST_REQUEST, 
    STORY_LIST_RESET, 
    STORY_LIST_SUCCESS,
} from '../Constants/storyConstants'

export const storyListReducer = (state={stories:[]}, action) => {
    switch(action.type){
        case STORY_LIST_REQUEST:
            return {loading: true, stories: []}
        case STORY_LIST_SUCCESS:
            return {
                loading: false, 
                stories: action.payload.stories,
                page: action.payload.page,
                pages: action.payload.pages
            }            
        case STORY_LIST_FAIL: 
            return {loading: false, error: action.payload}
        case STORY_LIST_RESET:
            return {}
        default: return state
    }
}

export const storyListAllReducer = (state={stories:[]}, action) => {
    switch(action.type){
        case STORY_LIST_ALL_REQUEST:
            return {loading: true, stories: []}
        case STORY_LIST_ALL_SUCCESS:
            return {loading: false, stories: action.payload}            
        case STORY_LIST_ALL_FAIL: 
            return {loading: false, error: action.payload}
        case STORY_LIST_ALL_RESET:
            return {}
        default: return state
    }
}

export const storyCreateReducer = (state={}, action) => {
    switch(action.type){
        case STORY_CREATE_REQUEST:
            return {loading: true}
        case STORY_CREATE_SUCCESS:
            return {loading: false, success: true}            
        case STORY_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case STORY_CREATE_RESET:
            return {}
        default: return state
    }
}

export const storyDeleteReducer = (state={}, action) => {
    switch(action.type){
        case STORY_DELETE_REQUEST:
            return {loading: true}
        case STORY_DELETE_SUCCESS:
            return {loading: false, success: true}            
        case STORY_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        case STORY_DELETE_RESET:
            return {}
        default: return state
    }
}

export const storyEditReducer = (state={}, action) => {
    switch(action.type){
        case STORY_EDIT_REQUEST:
            return {loading: true}
        case STORY_EDIT_SUCCESS:
            return {loading: false, success: true}            
        case STORY_EDIT_FAIL: 
            return {loading: false, error: action.payload}
        case STORY_EDIT_RESET:
            return {}
        default: return state
    }
}