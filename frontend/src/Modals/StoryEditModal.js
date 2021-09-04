import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, FormControl, Alert, Form, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editStory } from '../Actions/storyActions';
import {listAllSeason} from '../Actions/seasonActions';
import Loader from '../Components/Loader';
import { STORY_EDIT_RESET } from '../Constants/storyConstants'

const StoryEditModal = ({story}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [code, setCode] = useState(story.code)
    const [name, setName] = useState(story.name)
    const [season, setSeason] = useState(story.season ? story.season._id : '')
    
    const handleShow = () => setShow(true);

    const {loading, error, success} = useSelector(state=>state.storyEdit)
    const {loading: loadingSeason, error: errorSeason, seasons} = useSelector(state=>state.seasonListAll)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === '' || code === '' || season === ''){
            toast.error('You can\'t submit empty data')   
            setCode(story.code)      
            setName(story.name)      
            setSeason(story.season) 
        } else {
            const data = {
                code,
                name,
                season
            }              
            dispatch(editStory(story._id, data))
        }    
    }

    const handleClose = () => {  
        setCode(story.code)
        setName(story.name) 
        setSeason(story.season._id)       
        dispatch({type: STORY_EDIT_RESET})
        setShow(false);
    }

    useEffect(()=>{
        if(show){
            dispatch(listAllSeason())
        }
        if(success){           
            setCode('')
            setName('') 
            setSeason('')     
            dispatch({type: STORY_EDIT_RESET})
            setShow(false);
        }
    },[success, dispatch, show])

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
            <Modal.Title>Edit story</Modal.Title>
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
                    className="mb-4 mt-2"
                    placeholder="Code" 
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Name">
                <FormControl 
                    type="text" 
                    className="mb-4 mt-2"
                    placeholder="Name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </FloatingLabel>
                    
                                   
                {loadingSeason ? <Loader /> :
                errorSeason ? <Alert variant='danger'>{errorSeason}</Alert> :
                seasons.length === 0 ? <Alert variant='info'>No story to show.</Alert> : (
                    <FloatingLabel label="Season">
                        <Form.Select onChange={e => setSeason(e.target.value)}>  
                            <option>{story.season.code} : {story.season.name}</option>    
                                {seasons.map((s, index)=> (                        
                                <option 
                                key={index}
                                value={s._id}                            
                                >{s.code} : {s.name}
                            </option>))}
                        </Form.Select>
                    </FloatingLabel>
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

export default StoryEditModal
