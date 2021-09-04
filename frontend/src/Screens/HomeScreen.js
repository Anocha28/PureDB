
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import SideBar from '../Components/SideBar'
import StyleScreen from './StyleScreen'
import BrandScreen from './BrandScreen'

const HomeScreen = () => {
    return (
        <div className='home'>
        <SideBar />
        <Router>
            <Switch>
                      
            <Route path='/style' component={StyleScreen} />   
            <Route path='/brand' component={BrandScreen} exact/>       
            </Switch>
        
        </Router>
        </div>        
    )
}

export default HomeScreen
