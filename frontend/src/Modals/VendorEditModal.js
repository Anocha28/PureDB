import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Alert, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editVendor } from '../Actions/vendorActions';
import Loader from '../Components/Loader';
import { VENDOR_EDIT_RESET } from '../Constants/vendorConstants'

const VendorEditModal = ({vendor}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [code, setCode] = useState(vendor.code)
    const [name, setName] = useState(vendor.name)
    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.vendorEdit)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === '' || code === ''){
            toast.error('You can\'t submit empty data')   
            setCode(vendor.code)      
            setName(vendor.name)      
        } else {
            const data = {
                code,
                name,
            }     
            dispatch(editVendor(vendor._id, data))
        }    
    }

    const handleClose = () => {  
        setCode(vendor.code)
        setName(vendor.name)      
        dispatch({type: VENDOR_EDIT_RESET})
        setShow(false);
    }

    useEffect(()=>{
        if(success){           
            setCode('')
            setName('')      
            dispatch({type: VENDOR_EDIT_RESET})
            setShow(false);
        }
    },[success, dispatch])

    return (
        <>   
        <Button 
            variant='flush' 
            className='m-0 px-3 py-0 fs-5 shadow-none'
            onClick={handleShow} 
            >
            <i className="m-0 p-0 bi bi-gear"></i>
        </Button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Edit vendor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {loading && <Loader />}
                {error && <Alert variant='danger'>{error}</Alert>}

                <FloatingLabel label="Code">
                <FormControl 
                    type="text" 
                    onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                    className="mb-4 mt-2"
                    placeholder="Code" 
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Name">
                <FormControl 
                    type="text" 
                    className="mb-4 mt-2"
                    placeholder="Name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </FloatingLabel>
                
            </Modal.Body>            
            <Modal.Footer>
            <Button 
                variant="outline-dark" 
                className='me-auto'
                style={{width: '100px'}}
                onClick={handleClose}>
                Close
            </Button>
            <Button 
                variant="outline-dark" 
                style={{width: '100px'}}
                onClick={handleSubmit}>
                Save 
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default VendorEditModal
