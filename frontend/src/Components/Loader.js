import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div className='d-flex justify-content-center'>
            <Spinner animation="border" /><h4 className='mx-3 text-muted'>Please wait...</h4>
        </div>
        
    )
}

export default Loader
