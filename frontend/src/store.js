import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { 
    userLoginReducer,
    userListReducer,
    userCreateReducer,
    userEditReducer,
    userDeleteReducer
} from './Reducers/userReducers'
import { 
    brandCreateReducer,
    brandListReducer,
    brandEditReducer,
    brandDeleteReducer,
 } from './Reducers/brandReducers'

import {
    colorListReducer,
    colorCreateReducer,
    colorDeleteReducer,
    colorEditReducer,
    colorListAllReducer,
} from './Reducers/colorReducers'

import {
    fabricCreateReducer,
    fabricDeleteReducer,
    fabricEditReducer,
    fabricListReducer,
    fabricListAllReducer,
} from './Reducers/fabricReducers'

import {
    seasonCreateReducer,
    seasonDeleteReducer,
    seasonEditReducer,
    seasonListReducer,
    seasonListAllReducer,
} from './Reducers/seasonReducers'

import {
    storyCreateReducer,
    storyDeleteReducer,
    storyEditReducer,
    storyListReducer,
    storyListAllReducer,
} from './Reducers/storyReducers'

import {
    vendorCreateReducer,
    vendorDeleteReducer,
    vendorEditReducer,
    vendorListReducer,
    vendorListAllReducer,
} from './Reducers/vendorReducers'

import {
    categoryCreateReducer,
    categoryDeleteReducer,
    categoryEditReducer,
    categoryListReducer,
    categoryListAllReducer,
} from './Reducers/categoryReducers'

import {
    styleCreateReducer,
    styleDeleteReducer,
    styleEditReducer,
    styleListReducer,
    styleListAllReducer,
    styleByIdReducer,
    styleCodeReducer,
} from './Reducers/styleReducers'


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    userCreate: userCreateReducer,
    userEdit: userEditReducer,
    userDelete: userDeleteReducer,
    
    brandCreate: brandCreateReducer,
    brandList: brandListReducer,
    brandEdit: brandEditReducer,
    brandDelete: brandDeleteReducer,

    colorList: colorListReducer,
    colorCreate: colorCreateReducer,
    colorDelete: colorDeleteReducer,
    colorEdit: colorEditReducer,
    colorListAll: colorListAllReducer,

    fabricList: fabricListReducer,
    fabricCreate: fabricCreateReducer,
    fabricDelete: fabricDeleteReducer,
    fabricEdit: fabricEditReducer,
    fabricListAll: fabricListAllReducer,

    seasonList: seasonListReducer,
    seasonListAll: seasonListAllReducer,
    seasonCreate: seasonCreateReducer,
    seasonDelete: seasonDeleteReducer,
    seasonEdit: seasonEditReducer,

    storyList: storyListReducer,
    storyCreate: storyCreateReducer,
    storyDelete: storyDeleteReducer,
    storyEdit: storyEditReducer,
    storyListAll: storyListAllReducer,

    vendorList: vendorListReducer,
    vendorListAll: vendorListAllReducer,
    vendorCreate: vendorCreateReducer,
    vendorDelete: vendorDeleteReducer,
    vendorEdit: vendorEditReducer,

    categoryList: categoryListReducer,
    categoryListAll: categoryListAllReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryEdit: categoryEditReducer,

    styleList: styleListReducer,
    styleById: styleByIdReducer,
    styleListAll: styleListAllReducer,
    styleCreate: styleCreateReducer,
    styleDelete: styleDeleteReducer,
    styleEdit: styleEditReducer,
    styleCode: styleCodeReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
                            JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)))



export default store