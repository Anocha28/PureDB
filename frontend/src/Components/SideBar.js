import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { logout } from '../Actions/userActions'



const SideBar = () => {
    const size = useWindowSize()
    const dispatch = useDispatch()

    const {userInfo} = useSelector(state=> state.userLogin)

    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <>
        {size.width <= 1000 ? 
            <div className='sidenavSmall nav d-flex flex-column'> 
            <Link to='#' className='sidenavitems border rounded mx-1'>{(JSON.stringify(userInfo.name)).substring(1,2).toUpperCase()}</Link>       
            <Link to='/style' className='sidenavitems'><i className='bi bi-bank2'></i></Link>
            <Link to='/brand' className='sidenavitems'><i className='bi bi-diagram-3-fill'></i></Link>
            <Link to='/color' className='sidenavitems'><i className='bi bi-palette'></i></Link>
            <Link to='/fabric' className='sidenavitems'><i className='bi bi-inboxes-fill'></i></Link>
            <Link to='/season' className='sidenavitems'><i className='bi bi-calendar-range'></i></Link>
            <Link to='/story' className='sidenavitems'><i className='bi bi-kanban'></i></Link>
            <Link to='/vendor' className='sidenavitems'><i className='bi bi-building'></i></Link>
            <Link to='/category' className='sidenavitems'><i className='bi bi-bookmark-star'></i></Link>
            {userInfo && userInfo.isAdmin &&
              <Link to='/user' className='sidenavitems'><i className='bi bi-person-lines-fill'></i></Link>
            }
            
            
            <Button 
                variant='flush'
                className='sidenavitems logout' 
                onClick={logoutHandler}
                ><i className='bi bi-box-arrow-left'></i>
            </Button>
        </div>
        : 
        <div className='sidenav nav d-flex flex-column'> 
            <Link to='#' className='sidenavitems border rounded mx-3 mb-3'><i className='bi bi-person-circle mr-2'></i><span className='text-uppercase'>{userInfo.name}</span></Link>       
            <Link to='/style' className='sidenavitems'><i className='bi bi-bank2'></i>Style</Link>
            <Link to='/brand' className='sidenavitems'><i className='bi bi-diagram-3-fill'></i>Brand</Link>
            <Link to='/color' className='sidenavitems'><i className='bi bi-palette'></i>Color</Link>
            <Link to='/fabric' className='sidenavitems'><i className='bi bi-inboxes-fill'></i>Fabric</Link>
            <Link to='/season' className='sidenavitems'><i className='bi bi-calendar-range'></i>Season</Link>
            <Link to='/story' className='sidenavitems'><i className='bi bi-kanban'></i>Story</Link>
            <Link to='/vendor' className='sidenavitems'><i className='bi bi-building'></i>Vendor</Link>
            <Link to='/category' className='sidenavitems'><i className='bi bi-bookmark-star'></i>Category</Link>
            {userInfo && userInfo.isAdmin &&
              <Link to='/user' className='sidenavitems'><i className='bi bi-person-lines-fill'></i>Users</Link>
            }
            
            <Button 
                variant='flush'
                className='sidenavitems logout' 
                onClick={logoutHandler}
                ><i className='bi bi-box-arrow-left'></i>
                Logout
            </Button>
        </div>
        } 
        </>       
    )
}

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

export default SideBar
