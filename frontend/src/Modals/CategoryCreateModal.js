import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, FloatingLabel, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCategory } from '../Actions/categoryActions';
import Loader from '../Components/Loader';
import {CATEGORY_CREATE_RESET} from '../Constants/categoryConstants'

const CategoryCreateModal = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [mainCategory, setMainCagetory] = useState('')
    const [customCode, setCustomCode] = useState('')
    const [customDescription, setCustomDescription] = useState('')
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.categoryCreate)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            code,
            name,
            description,
            mainCategory,
            customCode,
            customDescription
        }       
        const isEmpty = Object.values(data).some(x => x === '')  
        if(isEmpty){
            toast.error("You can't submit empty data.")
        } else {            
            dispatch(createCategory(data))
        }
    }

    const handleClose = () => {
        setCode('')
        setName('')
        setDescription('')
        setMainCagetory('')
        setCustomCode('')
        setCustomDescription('')
        dispatch({type: CATEGORY_CREATE_RESET})
        setShow(false)
    }

    useEffect(()=>{
        if(success){
            setCode('')
            setName('')
            setDescription('')
            setMainCagetory('')
            setCustomCode('')
            setCustomDescription('')
            dispatch({type: CATEGORY_CREATE_RESET})
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
            <Modal.Title>Add new category</Modal.Title>
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
                
                <FloatingLabel label="Category code">
                    <FormControl 
                        type="text" 
                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                        className="my-3"
                        placeholder="Category code" 
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                    />
                </FloatingLabel>
                
                <FloatingLabel label="Category name">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Category name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Category description">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Category description" 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Main category">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Main category" 
                        value={mainCategory}
                        onChange={(e)=>setMainCagetory(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Custom Code">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Custom Code" 
                        value={customCode}
                        onChange={(e)=>setCustomCode(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Custom Description">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Custom Description" 
                        value={customDescription}
                        onChange={(e)=>setCustomDescription(e.target.value)}
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

export default CategoryCreateModal
