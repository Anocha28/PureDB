import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Alert, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createFabric } from '../Actions/fabricActions';
import Loader from '../Components/Loader';
import {FABRIC_CREATE_RESET} from '../Constants/fabricConstants'

const FabricCreateModal = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [instruction, setInstruction] = useState('')    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.fabricCreate)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === '' || code === '' || content === '' || instruction === ''){
            toast.error("You can't submit empty data.")
        } else {
            const data = {
                code,
                name,
                content,
                instruction,
            }       
            dispatch(createFabric(data))
        }
    }

    const handleClose = () => {
        setCode('')
        setName('')
        setContent('')
        setInstruction('')
        dispatch({type: FABRIC_CREATE_RESET})
        setShow(false)
    }

    useEffect(()=>{
        if(success){
            setCode('')
            setName('')
            setContent('')
            setInstruction('')
            dispatch({type: FABRIC_CREATE_RESET})
            setShow(false)
        }
    },[success, dispatch])

    return (
        <>
        
        <Button 
            variant="outline-dark" 
            onClick={handleShow} 
            style={{width: '150px'}} 
            className='mx-2'>
            <i className='bi bi-plus-square'></i>New
        </Button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Add new fabric</Modal.Title>
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
                <FloatingLabel label="Fabric code">
                    <FormControl 
                        type="text" 
                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                        className="my-3"
                        placeholder="Fabric code" 
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                        />
                </FloatingLabel>

                <FloatingLabel label="Fabric name">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Fabric name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                </FloatingLabel>

                <FloatingLabel label="Fabric content">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Fabric content" 
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        />
                </FloatingLabel>
                
                <FloatingLabel label="Fabric wash instruction">
                    <FormControl 
                        as='textarea' 
                        style={{ height: '100px' }}
                        className="my-3"
                        placeholder="Fabric wash instruction" 
                        value={instruction}
                        onChange={(e)=>setInstruction(e.target.value)}
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

export default FabricCreateModal
