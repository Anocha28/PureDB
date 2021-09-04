import { 
    STYLE_BY_ID_FAIL,
    STYLE_BY_ID_REQUEST,
    STYLE_BY_ID_RESET,
    STYLE_BY_ID_SUCCESS,
    STYLE_CODE_FAIL,
    STYLE_CODE_REQUEST,
    STYLE_CODE_RESET,
    STYLE_CODE_SUCCESS,
    STYLE_CREATE_FAIL,
    STYLE_CREATE_REQUEST,
    STYLE_CREATE_RESET,
    STYLE_CREATE_SUCCESS,
    STYLE_DELETE_FAIL,
    STYLE_DELETE_REQUEST,
    STYLE_DELETE_RESET,
    STYLE_DELETE_SUCCESS,
    STYLE_EDIT_FAIL,
    STYLE_EDIT_REQUEST,
    STYLE_EDIT_RESET,
    STYLE_EDIT_SUCCESS,
    STYLE_LIST_ALL_FAIL,
    STYLE_LIST_ALL_REQUEST,
    STYLE_LIST_ALL_RESET,
    STYLE_LIST_ALL_SUCCESS,
    STYLE_LIST_FAIL,
    STYLE_LIST_REQUEST, 
    STYLE_LIST_RESET, 
    STYLE_LIST_SUCCESS,
} from '../Constants/styleConstants'

export const styleListReducer = (state={styles:[]}, action) => {
    switch(action.type){
        case STYLE_LIST_REQUEST:
            return {loading: true, styles: []}
        case STYLE_LIST_SUCCESS:
            return {
                loading: false, 
                styles: action.payload.styles,
                page: action.payload.page,
                pages: action.payload.pages
            }            
        case STYLE_LIST_FAIL: 
            return {loading: false, error: action.payload}
        case STYLE_LIST_RESET:
            return {}
        default: return state
    }
}

export const styleListAllReducer = (state={styles:[]}, action) => {
    switch(action.type){
        case STYLE_LIST_ALL_REQUEST:
            return {loading: true, styles: []}
        case STYLE_LIST_ALL_SUCCESS:
            return {loading: false, styles: action.payload}            
        case STYLE_LIST_ALL_FAIL: 
            return {loading: false, error: action.payload}
        case STYLE_LIST_ALL_RESET:
            return {}
        default: return state
    }
}

export const styleByIdReducer = (state={style:{sizes: [], seasons: [], stories: [], colors: []}}, action) => {
    switch(action.type){
        case STYLE_BY_ID_REQUEST:
            return {loading: true, styles: {sizes: [], seasons: [], stories: [], colors: []}}
        case STYLE_BY_ID_SUCCESS:
            return {loading: false, style: action.payload}            
        case STYLE_BY_ID_FAIL: 
            return {loading: false, error: action.payload}
        case STYLE_BY_ID_RESET:
            return {style:{sizes: [], seasons: [], stories: [], colors: []}}
        default: return state
    }
}

export const styleCreateReducer = (state={}, action) => {
    switch(action.type){
        case STYLE_CREATE_REQUEST:
            return {loading: true}
        case STYLE_CREATE_SUCCESS:
            return {loading: false, success: true}            
        case STYLE_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case STYLE_CREATE_RESET:
            return {}
        default: return state
    }
}

export const styleDeleteReducer = (state={}, action) => {
    switch(action.type){
        case STYLE_DELETE_REQUEST:
            return {loading: true}
        case STYLE_DELETE_SUCCESS:
            return {loading: false, success: true}            
        case STYLE_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        case STYLE_DELETE_RESET:
            return {}
        default: return state
    }
}

export const styleEditReducer = (state={}, action) => {
    switch(action.type){
        case STYLE_EDIT_REQUEST:
            return {loading: true}
        case STYLE_EDIT_SUCCESS:
            return {loading: false, success: true}            
        case STYLE_EDIT_FAIL: 
            return {loading: false, error: action.payload}
        case STYLE_EDIT_RESET:
            return {}
        default: return state
    }
}

export const styleCodeReducer = (state={codeFromServer: ''}, action) => {
    switch(action.type){
        case STYLE_CODE_REQUEST:
            return {loading: true}
        case STYLE_CODE_SUCCESS:
            return {loading: false, codeFromServer: action.payload}            
        case STYLE_CODE_FAIL: 
            return {loading: false, error: action.payload}
        case STYLE_CODE_RESET:
            return {code: ''}
        default: return state
    }
}