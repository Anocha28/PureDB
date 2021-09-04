import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, FloatingLabel, Alert, Form, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../Actions/userActions';
import Loader from '../Components/Loader';
import {USER_CREATE_RESET} from '../Constants/userConstants'

const UserCreateModal = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState('')    
    const [confirmPassword, setConfirmPassword] = useState('')
    const [warning, setWarning] = useState(false)
    const [view, setView] = useState(false)
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.userCreate)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(warning){
            toast.error('Password do not match.')
            return
        }
        if(view){
            if(name === '' || email === '' || password === ''){
                toast.error("You can't submit empty data.")
                return
            } else {
                const data = {
                    email,
                    name,
                    isAdmin,
                    password
                }   
                setWarning(false)    
                dispatch(createUser(data))
            }
        } else {
            if(name === '' || email === '' || password === '' || confirmPassword === ''){
                toast.error("You can't submit empty data.")
                return
            } else {
                const data = {
                    email,
                    name,
                    isAdmin,
                    password
                }   
                setWarning(false)    
                dispatch(createUser(data))
            }
        }
        
    }

    const handleClose = () => {
        setEmail('')
        setName('')
        setIsAdmin(false)
        setPassword('')
        setConfirmPassword('')
        dispatch({type: USER_CREATE_RESET})
        setWarning(false)
        setView(false)
        setShow(false)
    }

    const checkPasswordMatch = () => {
        if(password !== confirmPassword) {
            setWarning(true)
        } else {
            setWarning(false)
        }
        return
    }

    useEffect(()=>{
        
        if(success){
            setEmail('')
            setName('')
            setIsAdmin(false)
            setPassword('')
            setConfirmPassword('')
            dispatch({type: USER_CREATE_RESET})
            setWarning(false)
            setView(false)
            setShow(false)
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
            <Modal.Title>Add new user</Modal.Title>
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
                        className="my-3"
                        placeholder="Name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </FloatingLabel>
                
                <FloatingLabel label="Email">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </FloatingLabel>

                <Form.Check
                    name="Admin"
                    className='my-3'
                    value={isAdmin}
                    onChange={(e)=>setIsAdmin(!isAdmin)}
                    label="Admin"
                    />


                <Form.Label className='text-muted my-0'>Password</Form.Label>
                <InputGroup className='mb-3'>
                    {view ? <FormControl 
                        type="text"
                        className={`${warning && 'border-danger'}`}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    /> : 
                    <FormControl 
                        type="password"
                        className={`${warning && 'border-danger'}`}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
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
                        <Form.Label className='text-muted my-0'>Confirm Password</Form.Label>
                        <FormControl 
                            type="password"
                            className={`mb-3 ${warning && 'border-danger'}`}
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
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
                disabled={warning}
                onClick={handleSubmit}>
                Save 
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default UserCreateModal
