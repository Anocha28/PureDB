import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Alert, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editCategory } from '../Actions/categoryActions';
import Loader from '../Components/Loader';
import { CATEGORY_EDIT_RESET } from '../Constants/categoryConstants'

const CategoryEditModal = ({category}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [code, setCode] = useState(category.code)
    const [name, setName] = useState(category.name)
    const [description, setDescription] = useState(category.description)
    const [mainCategory, setMainCagetory] = useState(category.mainCategory)
    const [customCode, setCustomCode] = useState(category.customCode)
    const [customDescription, setCustomDescription] = useState(category.customDescription)    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.categoryEdit)

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
            toast.error('You can\'t submit empty data')   
            setCode(category.code)      
            setName(category.name)      
            setDescription(category.description)   
            setMainCagetory(category.mainCategory)   
            setCustomCode(category.customCode)   
            setCustomDescription(category.customDescription)   
        } else {    
            dispatch(editCategory(category._id, data))
        }    
    }

    const handleClose = () => {  
        setCode(category.code)      
        setName(category.name)      
        setDescription(category.description)   
        setMainCagetory(category.mainCategory)   
        setCustomCode(category.customCode)   
        setCustomDescription(category.customDescription) 
        dispatch({type: CATEGORY_EDIT_RESET})
        setShow(false);
    }

    useEffect(()=>{
        if(success){           
            setCode('')      
            setName('')      
            setDescription('')   
            setMainCagetory('')   
            setCustomCode('')   
            setCustomDescription('')
            dispatch({type: CATEGORY_EDIT_RESET})
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
            <Modal.Title>Edit category</Modal.Title>
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
                    className="mb-3 mt-2"
                    placeholder="Code" 
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Name">
                <FormControl 
                    type="text" 
                    className="mb-3 mt-2"
                    placeholder="Name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </FloatingLabel>
                    
                <FloatingLabel label="Description">
                <FormControl 
                    type="text" 
                    className="mb-3 mt-2"
                    placeholder="Description" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    />
                </FloatingLabel>
                
                <FloatingLabel label="Main Category">
                <FormControl 
                    type="text" 
                    className="mb-3 mt-2"
                    placeholder="Main Category" 
                    value={mainCategory}
                    onChange={(e)=>setMainCagetory(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Custom Code">
                <FormControl 
                    type="text" 
                    className="mb-3 mt-2"
                    placeholder="Custom code" 
                    value={customCode}
                    onChange={(e)=>setCustomCode(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Custom Description">
                <FormControl 
                    type="text" 
                    className="mb-3 mt-2"
                    placeholder="Custom description" 
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

export default CategoryEditModal
