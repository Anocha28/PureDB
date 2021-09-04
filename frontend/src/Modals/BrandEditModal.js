import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Image, Alert, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editBrand } from '../Actions/brandActions';
import Loader from '../Components/Loader';
import { BRAND_EDIT_RESET } from '../Constants/brandConstants';

const BrandEditModal = ({brand}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [name, setName] = useState(brand.name)
    const [newLogo, setNewLogo] = useState('')
    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.brandEdit)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === ''){
            toast.error('You can\'t submit empty data')   
            setName(brand.name)         
        } else {
            if(newLogo) {
                const data = new FormData()
                data.append('name', name)
                data.append('files', newLogo)        
                dispatch(editBrand(brand._id, data))
            } else {
                const data = new FormData()
                data.append('name', name)
                data.append('logo', brand.logo)        
                dispatch(editBrand(brand._id, data))
            }
        }    
    }

    const handleClose = async () => {  
        setName(brand.name) 
        setNewLogo('')     
        dispatch({type: BRAND_EDIT_RESET})
        setShow(false);
    }

    useEffect(()=>{
        if(success){           
            setName('') 
            setNewLogo('')     
            dispatch({type: BRAND_EDIT_RESET})
            setShow(false);
        }
    },[success, dispatch])

    return (
        <>   
        <Button 
            variant='flush' 
            className='m-0 px-3 fs-3 shadow-none'
            onClick={handleShow} 
            >
            <i className="bi bi-gear m-0 p-0"></i>
        </Button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Edit brand</Modal.Title>
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

                <FloatingLabel label="Brand Name">
                    <FormControl 
                        type="text" 
                        className="mb-4 mt-2"
                        placeholder="Brand name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </FloatingLabel>
                
                <div className='border rounded p-2 mb-2'>
                <small className='text-muted my-0 '>Brand Logo</small>
                <FormControl 
                    type='file'
                    className="my-1"
                    name="image"
                    accept='.jpg,.jpeg,.png,.gif'
                    onChange={e => setNewLogo(e.target.files[0])}
                    />
                </div>
                

                {newLogo ? 
                    <Image src={URL.createObjectURL(newLogo)} className='shadow' style={{width: '150px'}} />
                    :
                    <Image src={brand.logo} className='shadow' style={{width: '150px'}} />
                }
                
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

export default BrandEditModal
