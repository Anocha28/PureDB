import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Alert, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSeason } from '../Actions/seasonActions';
import Loader from '../Components/Loader';
import {SEASON_CREATE_RESET} from '../Constants/seasonConstants'

const SeasonCreateModal = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.seasonCreate)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === '' || code === '' || start === '' || end === ''){
            toast.error("You can't submit empty data.")
        } else {
            const data = {
                code,
                name,
                start,
                end,
            }       
            dispatch(createSeason(data))
        }
    }

    const handleClose = () => {
        setCode('')
        setName('')
        setStart('')
        setEnd('')
        dispatch({type: SEASON_CREATE_RESET})
        setShow(false)
    }

    useEffect(()=>{
        if(success){
            setCode('')
            setName('')
            setStart('')
            setEnd('')
            dispatch({type: SEASON_CREATE_RESET})
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
            <Modal.Title>Add new season</Modal.Title>
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
                <FloatingLabel label="Season code">
                    <FormControl 
                        type="text" 
                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                        className="my-3"
                        placeholder="Season code" 
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                        />
                </FloatingLabel>

                <FloatingLabel label="Season name">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Season name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                </FloatingLabel>

                <FloatingLabel label="Season start date">
                    <FormControl 
                        type="date" 
                        className="my-3"
                        placeholder="Season start date" 
                        value={start}
                        onChange={(e)=>setStart(e.target.value)}
                        />
                </FloatingLabel>
                
                <FloatingLabel label="Season end date">
                    <FormControl 
                        type="date" 
                        className="my-3"
                        placeholder="Season end date" 
                        value={end}
                        onChange={(e)=>setEnd(e.target.value)}
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

export default SeasonCreateModal
