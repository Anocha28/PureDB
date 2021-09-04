import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

const DeleteConfirmModalButton = ({deleteFunction, id, width}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const handleConfirm = () => {
        dispatch(deleteFunction(id))
        setShow(!show);
    }

    return (
        <>
            <Button
                variant='outline-danger'
                style={{width: `${width}`}}
                className='mx-3 my-2'
                onClick={handleShow}
                > <i className='bi bi-trash'></i>Delete
            </Button>


           <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className='mx-auto'>
                    <i className="bi bi-exclamation-triangle-fill" style={{fontSize: '2rem', color: 'red'}}></i>
                    Confirm delete ?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='d-flex justify-content-between'>
            <Button variant="outline-dark" className='px-5' onClick={handleClose}>
                No
            </Button>

            <Button variant="outline-danger" className='px-5' onClick={handleConfirm}>
                Yes
            </Button>
            </Modal.Body>

        </Modal>
        </>
    )
}

DeleteConfirmModalButton.defaultProps = {
width: '100px'
}

export default DeleteConfirmModalButton
