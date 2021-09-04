import React, {useEffect, useState} from 'react'
import { Route, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Table, Row, Col, Alert, ListGroup, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Components/Loader'
import Paginate from '../Components/Paginate'
import SearchBox from '../Components/SearchBox'
import FabricCreateModal from '../Modals/FabricCreateModal'

import { listFabric, editFabric, deleteFabric } from '../Actions/fabricActions'
import DeleteConfirmModalButton from '../Modals/DeleteConfirmModalButton'



const FabricScreen = () => {
    const perPageList = [ 20, 50, 100]
    const {keyword} = useParams() 
    const pageNumber = useParams().pageNumber || 1
    const dispatch = useDispatch()
    const [perPage, setPerPage] = useState(20)
    const [detail, setDetail] = useState({})
    const [edit, setEdit] = useState(true)
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [instruction, setInstruction] = useState('')
    const [sortBy, setSortBy] = useState('')

    const {loading, error, fabrics, page, pages} = useSelector(state=> state.fabricList)
    const {loading: loadingEdit, error: errorEdit, success: successEdit} = useSelector(state=> state.fabricEdit)
    const {success: successCreate} = useSelector(state=>state.fabricCreate)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = useSelector(state=>state.fabricDelete)

    useEffect(()=>{
        dispatch(listFabric(keyword, pageNumber, perPage, sortBy))
    },[dispatch, successCreate, successEdit, successDelete, keyword, pageNumber, perPage, sortBy])

    const handleEdit = async (fabric) => {
        setDetail(fabric)
        setCode(fabric.code)
        setName(fabric.name)
        setContent(fabric.content)
        setInstruction(fabric.instruction)
    }

    const handleUpdate = (id) => {
        if(code === '' || name === '' || content === '' || instruction === ''){
            toast.error("You can't submit empty data.")
            return 
        }
        const data = {
            code, 
            name,
            content,
            instruction,
        }
        dispatch(editFabric(id, data))
        setDetail({})
        setEdit(true)
    }

    return (
        <>
            <div className='brandHeading'>
                <div className='d-flex flex-wrap'> 
                    <div className='mx-2 my-1'>            
                        <FabricCreateModal />
                    </div>  
                    <div className='mx-2 my-1'>
                        <Route render={({history})=><SearchBox forURL={'fabric'} history={history} />} /> 
                    </div>  
                    <div className='mx-2 my-1'>
                    <Form.Select onChange={e => setPerPage(e.target.value)} style={{width: '150px'}}>                     
                        {perPageList.map((p, index)=> (                        
                            <option 
                            key={index}
                            value={p}                            
                            >{p}</option>
                        ))}
                    </Form.Select>  
                    </div>
                </div>
            </div>

            {loading ? <Loader /> :
            error ? <Alert variant='danger' className='text-center' style={{widht: '500px'}}>{error}</Alert> :
                <div className='p-3'> 
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
                <h1 className='text-center mb-3'>Fabric List</h1>
                    <Row>
                        <Col lg={6} md={6} s={6} xs={12}>
                            <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                <th className='mid'>Code
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('code')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid'>Name
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('name')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid'>Content
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('content')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid'>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fabrics.map((fabric, index)=> (
                                    <tr key={index}>
                                        <td className='mid'>{fabric.code}</td>
                                        <td>{fabric.name}</td>
                                        <td>{fabric.content}</td>
                                        <td className='m-0 p-0 mid'>
                                            <Button
                                                variant='flush'
                                                className='m-0 p-0'
                                                onClick={()=> handleEdit(fabric)}
                                            >
                                            <i className='bi bi-box-arrow-right px-4 py-0 m-0 fs-3'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </Table>

                            <div className='d-flex justify-content-center'>
                                <Paginate 
                                    variant='dark'
                                    forURL = {'fabric'}
                                    pages = {pages} 
                                    page={page} 
                                    keyword={keyword ? keyword : ''}/>
                            </div>
                        </Col>

                        <Col lg={6} md={6} s={6} xs={12} className='px-5'>
                            <h1 className='text-center'>Detail</h1>
                            {(loadingEdit || loadingDelete) && <Loader />}
                            {errorEdit && <Alert variant='danger' className='text-center'>{errorEdit}</Alert>}
                            {errorDelete && <Alert variant='danger' className='text-center'>{errorDelete}</Alert>}
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col lg={2} className='my-2'>
                                            <Form.Label>Code</Form.Label>
                                        </Col>
                                        <Col lg={10}>
                                            <Form.Control 
                                                type='text' 
                                                defaultValue={detail.code} 
                                                disabled={edit}
                                                onChange={(e)=>setCode(e.target.value)}
                                                />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col lg={2} className='my-2'>
                                            <Form.Label>Name</Form.Label>
                                        </Col>
                                        <Col lg={10}>
                                            <Form.Control 
                                                type='text' 
                                                defaultValue={detail.name} 
                                                disabled={edit}
                                                onChange={(e)=>setName(e.target.value)}
                                                />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col lg={2} className='my-2'>
                                            <Form.Label>Content</Form.Label>
                                        </Col>
                                        <Col lg={10}>
                                            <Form.Control 
                                                type='text' 
                                                defaultValue={detail.content} 
                                                disabled={edit}
                                                onChange={(e)=>setContent(e.target.value)}
                                                />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col lg={2} className='my-2'>
                                            <Form.Label>Instruction</Form.Label>
                                        </Col>
                                        <Col lg={10}>
                                            <Form.Control 
                                                as='textarea' 
                                                defaultValue={detail.instruction ? detail.instruction : ''}
                                                rows={4}
                                                disabled={edit}
                                                onChange={(e)=>setInstruction(e.target.value)}
                                                />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item className='mt-4'>
                                    <Button
                                        variant='outline-warning'
                                        style={{width: '100px'}}
                                        className='mx-2 my-2'
                                        onClick={()=>setEdit(false)}
                                        disabled={detail.name ? false : true}
                                        ><i className='bi bi-gear'></i>Edit
                                        </Button>
                                        {!edit && 
                                        <>
                                            <Button
                                                variant='outline-success'
                                                style={{width: '100px'}}
                                                className='mx-2 my-2'
                                                onClick={()=>handleUpdate(detail._id)}
                                                > <i className='bi bi-save'></i>Save
                                            </Button>
                                            
                                            <Button
                                                variant='outline-info'
                                                style={{width: '100px'}}
                                                className='mx-2 my-2'
                                                onClick={()=>{setDetail({}); setEdit(true)}}
                                                > <i className='bi bi-x-square'></i>Cancel
                                            </Button>

                                            <DeleteConfirmModalButton
                                                deleteFunction={deleteFabric} 
                                                id={detail._id}
                                            />
                                        </> }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>               
                    
                </div>
            }
            
        </>
    )
}

export default FabricScreen
