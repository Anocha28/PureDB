import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Alert, FloatingLabel, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createStory } from '../Actions/storyActions';
import {listAllSeason} from '../Actions/seasonActions';
import Loader from '../Components/Loader';
import {STORY_CREATE_RESET} from '../Constants/storyConstants'

const StoryCreateModal = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [season, setSeason] = useState('')
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.storyCreate)
    const {loading: loadingSeason, error: errorSeason, seasons} = useSelector(state=>state.seasonListAll)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === '' || code === '' || season === ''){
            toast.error("You can't submit empty data.")
        } else {
            const data = {
                code,
                name,
                season,
            }       
            dispatch(createStory(data))
        }
    }

    const handleClose = () => {
        setCode('')
        setName('')
        setSeason('')
        dispatch({type: STORY_CREATE_RESET})
        setShow(false)
    }

    useEffect(()=>{
        if(show){
            dispatch(listAllSeason())
        }
        if(success){
            setCode('')
            setName('')
            setSeason('')
            dispatch({type: STORY_CREATE_RESET})
            setShow(false)
        }
    },[success, dispatch, show])

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
            <Modal.Title>Add new story</Modal.Title>
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
                <FloatingLabel label="Story code">
                    <FormControl 
                        type="text" 
                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                        className="my-3"
                        placeholder="Story code" 
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                        />
                </FloatingLabel>

                <FloatingLabel label="Story name">
                    <FormControl 
                        type="text" 
                        className="my-3"
                        placeholder="Story name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                </FloatingLabel>

                                    
                {loadingSeason ? <Loader /> :
                errorSeason ? <Alert variant='danger'>{errorSeason}</Alert> :
                seasons.length === 0 ? <Alert variant='info'>No story to show.</Alert> : (
                    <Form.Select onChange={e => setSeason(e.target.value)}> 
                        <option>Select Season for new story</option>    
                        {seasons.map((s, index)=> (                        
                        <option 
                            key={index}
                            value={s._id}                            
                            >{s.code} : {s.name}
                        </option>
                ))}</Form.Select>
                )}
                                
                
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

export default StoryCreateModal
