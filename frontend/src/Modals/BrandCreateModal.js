import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Image, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrand } from '../Actions/brandActions';
import Loader from '../Components/Loader';
import { BRAND_CREATE_RESET } from '../Constants/brandConstants';

const BrandCreateModal = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [image, setImage] = useState('')    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.brandCreate)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === '' || image === ''){
            toast.error("You can't submit empty data.")
        } else {
            const data = new FormData()
            data.append('name', name)
            data.append('files', image)        
            dispatch(createBrand(data))
        }
    }

    const handleClose = () => {
        setName('')
        setImage('')
        dispatch({type: BRAND_CREATE_RESET})
        setShow(false)
    }

    useEffect(()=>{
        if(success){
            setName('')
            setImage('')
            dispatch({type: BRAND_CREATE_RESET})
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
            New
        </Button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Add new brand</Modal.Title>
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
                <small className='text-muted m-0 p-0'>BRAND NAME</small>
                <FormControl 
                    type="text" 
                    className="mb-4 mt-2"
                    placeholder="Brand name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                
                <FormControl 
                    type='file'
                    className="my-4"
                    name="image"
                    accept='.jpg,.jpeg,.png,.gif'
                    onChange={e => setImage(e.target.files[0])}
                    />
                {image && <Image src={URL.createObjectURL(image)} className='shadow' style={{width: '150px'}} />}
            
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

export default BrandCreateModal
