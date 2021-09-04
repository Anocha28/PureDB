import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, FloatingLabel, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createColor } from '../Actions/colorActions';
import Loader from '../Components/Loader';
import {COLOR_CREATE_RESET} from '../Constants/colorConstants'

const ColorCreateModal = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [map, setMap] = useState('')    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.colorCreate)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === '' || code === '' || map === ''){
            toast.error("You can't submit empty data.")
        } else {
            const data = {
                code,
                name,
                map
            }       
            dispatch(createColor(data))
        }
    }

    const handleClose = () => {
        setCode('')
        setName('')
        setMap('')
        dispatch({type: COLOR_CREATE_RESET})
        setShow(false)
    }

    useEffect(()=>{
        if(success){
            setCode('')
            setName('')
            setMap('')
            dispatch({type: COLOR_CREATE_RESET})
            setShow(false)
        }
    },[success, dispatch])

    return (
        <>
        
        <Button 
            variant="outline-dark" 
            onClick={handleShow} 
            style={{width: '150px'}} 
            className='mx-3'>
            <i className='bi bi-plus-square'></i>New
        </Button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Add new color</Modal.Title>
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
                
                <FloatingLabel label="Color code">
                    <FormControl 
                        type="text" 
                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                        className="my-3"
                        placeholder="Color code" 
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                    />
                </FloatingLabel>
                
                <FloatingLabel label="Color name">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Color name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Color map">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Color map" 
                        value={map}
                        onChange={(e)=>setMap(e.target.value)}
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

export default ColorCreateModal
