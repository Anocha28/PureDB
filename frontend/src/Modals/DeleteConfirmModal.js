import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

const DeleteConfirmModal = ({deleteFunction, id, icon, size, text}) => {
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
                variant='flush' 
                className={`m-0 px-3 py-0 shadow-none ${size}`}
                onClick={handleShow}
                >
                <i className={`m-0 p-0 ${icon}`}></i>{text}
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

DeleteConfirmModal.defaultProps = {
    icon: "bi bi-x-square-fill",
    size: "fs-3",
    text: null
}

export default DeleteConfirmModal
