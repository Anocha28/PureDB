import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"

import './App.css';
import SideBar from "./Components/SideBar";
import LoginScreen from './Screens/LoginScreen';
import StyleScreen from "./Screens/StyleScreen";
import BrandScreen from "./Screens/BrandScreen";
import ColorScreen from './Screens/ColorScreen';
import FabricScreen from './Screens/FabricScreen';
import SeasonScreen from './Screens/SeasonScreen';
import StoryScreen from './Screens/StoryScreen';
import VendorScreen from './Screens/VendorScreen';
import CategoryScreen from './Screens/CategoryScreen';
import UsersScreen from './Screens/UsersScreen';


function App() {
  const size = useWindowSize()

  const {userInfo} = useSelector(state=>state.userLogin)

  return (   
    <>
    <Router>
    {userInfo && <SideBar /> }
          <div className={size.width <= 1000 ? 'mobileScreen' : 'bigScreen'}>
            <Switch>                      

            <Route path='/brand'>
            {userInfo ?  <BrandScreen /> : <Redirect to='/' />}
            </Route>

            <Route path='/user'>
            {userInfo && userInfo.isAdmin ? <UsersScreen /> : <Redirect to='/' />}
            </Route>

            {/* ------------- STYLE ROUTES----------------- */}
            <Route path='/style/search/:keyword' exact>
            {userInfo ?  <StyleScreen /> : <Redirect to='/' />}
            </Route>            
            <Route path='/style/page/:pageNumber' exact>
            {userInfo ?  <StyleScreen /> : <Redirect to='/' />}
            </Route>    
            <Route path='/style/search/:keyword/page/:pageNumber' exact>
            {userInfo ?  <StyleScreen /> : <Redirect to='/' />}
            </Route>        
            <Route path='/style' exact>
            {userInfo ?  <StyleScreen /> : <Redirect to='/' />}
            </Route>

            {/* ------------- COLOR ROUTES----------------- */}
            <Route path='/color/search/:keyword' exact>
            {userInfo ?  <ColorScreen /> : <Redirect to='/' />}
            </Route>            
            <Route path='/color/page/:pageNumber' exact>
            {userInfo ?  <ColorScreen /> : <Redirect to='/' />}
            </Route>    
            <Route path='/color/search/:keyword/page/:pageNumber' exact>
            {userInfo ?  <ColorScreen /> : <Redirect to='/' />}
            </Route>        
            <Route path='/color' exact>
            {userInfo ?  <ColorScreen /> : <Redirect to='/' />}
            </Route>

            {/* ------------- FABRIC ROUTES----------------- */}
            <Route path='/fabric/search/:keyword' exact>
            {userInfo ?  <FabricScreen /> : <Redirect to='/' />}
            </Route>            
            <Route path='/fabric/page/:pageNumber' exact>
            {userInfo ?  <FabricScreen /> : <Redirect to='/' />}
            </Route>    
            <Route path='/fabric/search/:keyword/page/:pageNumber' exact>
            {userInfo ?  <FabricScreen /> : <Redirect to='/' />}
            </Route>        
            <Route path='/fabric' exact>
            {userInfo ?  <FabricScreen /> : <Redirect to='/' />}
            </Route>

            {/* ------------- SEASON ROUTES----------------- */}
            <Route path='/season/search/:keyword' exact>
            {userInfo ?  <SeasonScreen /> : <Redirect to='/' />}
            </Route>            
            <Route path='/season/page/:pageNumber' exact>
            {userInfo ?  <SeasonScreen /> : <Redirect to='/' />}
            </Route>    
            <Route path='/season/search/:keyword/page/:pageNumber' exact>
            {userInfo ?  <SeasonScreen /> : <Redirect to='/' />}
            </Route>        
            <Route path='/season' exact>
            {userInfo ?  <SeasonScreen /> : <Redirect to='/' />}
            </Route>

            {/* ------------- STORY ROUTES----------------- */}
            <Route path='/story/search/:keyword' exact>
            {userInfo ?  <StoryScreen /> : <Redirect to='/' />}
            </Route>            
            <Route path='/story/page/:pageNumber' exact>
            {userInfo ?  <StoryScreen /> : <Redirect to='/' />}
            </Route>    
            <Route path='/story/search/:keyword/page/:pageNumber' exact>
            {userInfo ?  <StoryScreen /> : <Redirect to='/' />}
            </Route>        
            <Route path='/story' exact>
            {userInfo ?  <StoryScreen /> : <Redirect to='/' />}
            </Route>

            {/* ------------- VENDOR ROUTES----------------- */}
            <Route path='/vendor/search/:keyword' exact>
            {userInfo ?  <VendorScreen /> : <Redirect to='/' />}
            </Route>            
            <Route path='/vendor/page/:pageNumber' exact>
            {userInfo ?  <VendorScreen /> : <Redirect to='/' />}
            </Route>    
            <Route path='/vendor/search/:keyword/page/:pageNumber' exact>
            {userInfo ?  <VendorScreen /> : <Redirect to='/' />}
            </Route>        
            <Route path='/vendor' exact>
            {userInfo ?  <VendorScreen /> : <Redirect to='/' />}
            </Route>

            {/* ------------- CATEGORY ROUTES----------------- */}
            <Route path='/category/search/:keyword' exact>
            {userInfo ?  <CategoryScreen /> : <Redirect to='/' />}
            </Route>            
            <Route path='/category/page/:pageNumber' exact>
            {userInfo ?  <CategoryScreen /> : <Redirect to='/' />}
            </Route>    
            <Route path='/category/search/:keyword/page/:pageNumber' exact>
            {userInfo ?  <CategoryScreen /> : <Redirect to='/' />}
            </Route>        
            <Route path='/category' exact>
            {userInfo ?  <CategoryScreen /> : <Redirect to='/' />}
            </Route>

      
            <Route path='/' component={LoginScreen} exact/>      
            
            </Switch>
            
          </div>
     
    </Router>
    
    </>
  );
}

export default App;

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.outerWidth,
        height: window.outerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}