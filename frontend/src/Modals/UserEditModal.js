import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Alert, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUser } from '../Actions/userActions';
import Loader from '../Components/Loader';
import { USER_EDIT_RESET } from '../Constants/userConstants'

const UserEditModal = ({user}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.name)
    const [isAdmin, setIsAdmin] = useState(user.isAdmin)
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')
    const [warning, setWarning] = useState(false)
    const [view, setView] = useState(false)
    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.userEdit)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(warning){
            toast.error('Password do not match.')
            return
        }
        if(name === '' || email === ''){
            toast.error('You can\'t submit empty data')   
            setEmail(user.email)      
            setName(user.name)      
            setIsAdmin(user.isAdmin) 
            setNewPassword('')
            setNewConfirmPassword('')     
        } else {
            const data = {
                email,
                name,
                isAdmin,
                password: newPassword ? newPassword : ''
            }     
            dispatch(editUser(user._id, data))
            setWarning(false)
        }    
    }

    const handleClose = () => {  
        setEmail(user.email)
        setName(user.name) 
        setNewPassword('')     
        setNewConfirmPassword('')     
        setIsAdmin(user.isAdmin)     
        dispatch({type: USER_EDIT_RESET})
        setWarning(false)
        setShow(false);
    }

    useEffect(()=>{
        if(success){           
            setEmail('')
            setName('') 
            setIsAdmin(false) 
            setNewPassword('') 
            setNewConfirmPassword('')     
            dispatch({type: USER_EDIT_RESET})
            setWarning(false)
            setShow(false);
        }

    },[success, dispatch])

    useEffect(()=>{
        if(view){
            setWarning(false)
        }
        if(!view){
            checkPasswordMatch()
        }
        // eslint-disable-next-line
    },[view])

    const checkPasswordMatch = () => {
        if(newPassword !== newConfirmPassword) {
            setWarning(true)
        } else {            
            setWarning(false)
        }
        return
    }

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
            <Modal.Title>Edit user {warning && <small className='text-danger' style={{fontSize: '0.9rem'}}>password not match</small>}</Modal.Title>
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

                <FloatingLabel label="Name">
                <FormControl 
                    type="text"  
                    className="mb-4 mt-2"
                    placeholder="Name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Email">
                <FormControl 
                    type="text" 
                    className="mb-4 mt-2"
                    placeholder="Email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </FloatingLabel>

                <Form.Check
                    name="Admin"
                    className='my-3'
                    value={isAdmin}
                    defaultChecked = {isAdmin}
                    onChange={(e)=>setIsAdmin(!isAdmin)}
                    label="Admin"
                    />

                <Form.Label className='text-muted my-0'>New Password</Form.Label>
                <InputGroup className='mb-3'>
                    {view ? <FormControl 
                        type="text"
                        className={`${warning && 'border-danger'}`}
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                    /> : 
                    <FormControl 
                        type="password"
                        className={`${warning && 'border-danger'}`}
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                    />
                    }
                    <Button
                        variant='outline-secondary' 
                        className='mx-auto'
                        onClick={()=>setView(!view)}   
                    >{view ? <i className='bi bi-eye-slash-fill'></i> : <i className='bi bi-eye-fill'></i>}</Button>                    
                </InputGroup>

                {!view && 
                    <>
                        <Form.Label className='text-muted my-0'>Confirm New Password</Form.Label>
                        <FormControl 
                            type="password"
                            className={`mb-3 ${warning && 'border-danger'}`}
                            value={newConfirmPassword}
                            onChange={(e)=>setNewConfirmPassword(e.target.value)}
                            onKeyPress={checkPasswordMatch}
                            onBlur={checkPasswordMatch}
                            onKeyUp={checkPasswordMatch}
                        />
                    </>
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

export default UserEditModal
