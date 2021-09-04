import React, {useEffect, useState} from 'react'
import { Route, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Table, Row, Col, Alert, Button } from 'react-bootstrap'
import Loader from '../Components/Loader'
import Paginate from '../Components/Paginate'
import SearchBox from '../Components/SearchBox'
import StoryCreateModal from '../Modals/StoryCreateModal'
import StoryEditModal from '../Modals/StoryEditModal'
import { listStory, deleteStory } from '../Actions/storyActions'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'



const StoryScreen = () => {
    const perPageList = [ 20, 50, 100]
    const {keyword} = useParams() 
    const pageNumber = useParams().pageNumber || 1
    const dispatch = useDispatch()
    const [perPage, setPerPage] = useState(20)
    const [sortBy, setSortBy] = useState('')

    const {loading, error, stories, page, pages} = useSelector(state=> state.storyList)
    const {success: successEdit} = useSelector(state=> state.storyEdit)
    const {success: successCreate} = useSelector(state=>state.storyCreate)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = useSelector(state=>state.storyDelete)

    useEffect(()=>{
        dispatch(listStory(keyword, pageNumber, perPage, sortBy))
    },[dispatch, successCreate, successEdit, successDelete, keyword, pageNumber, perPage, sortBy])


    return (
        <>
            <div className='brandHeading'>
                <div className='d-flex flex-wrap'> 
                    <div className='mx-2 my-1'>            
                        <StoryCreateModal />
                    </div>  
                    <div className='mx-2 my-1'>
                        <Route render={({history})=><SearchBox forURL={'story'} history={history} />} /> 
                    </div>    
                    {/* <div className='mx-2 my-1'>
                        <Button 
                            variant='outline-dark'
                            className=''
                            style={{width: '150px'}}
                            onClick={()=>console.log('data export')}
                        ><i className="bi bi-file-earmark-spreadsheet"></i>Export Data</Button>
                    </div>   */}
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

            {(loading || loadingDelete) ? <Loader /> :
            error ? <Alert variant='danger' className='text-center'>{error}</Alert> :
            errorDelete ? <Alert variant='danger' className='text-center'>{errorDelete}</Alert> :
            stories.length === 0 ? <Alert variant='info'>No story to show.</Alert> : 
                <div className='p-3'> 
                <h1 className='text-center mb-3'>Story List</h1>
                    <Row>
                        <Col lg={8} md={8} s={12} xs={12}>
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
                                <th className='mid d-none d-sm-table-cell'>Season Code</th>
                                <th className='mid d-none d-sm-table-cell'>Season Name</th>
                                <th className='mid'>Edit</th>
                                <th className='mid'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stories.map((story, index)=> (
                                    <tr key={index}>
                                        <td className='mid'>{story.code}</td>
                                        <td className='mid'>{story.name}</td>
                                        <td className='mid d-none d-sm-table-cell'>{story.season ? story.season.code : ''}</td>
                                        <td className='mid d-none d-sm-table-cell'>{story.season ? story.season.name : ''}</td>
                                        <td className='mid'>{
                                            story.season ? 
                                                <StoryEditModal story={story} /> :
                                                <div title="Season related to this story has been deleted." className='errorHover'>
                                                    <i className="bi bi-exclamation-triangle-fill m-0 p-0" style={{fontSize: '1.5rem', color: 'red'}}></i>
                                                </div>
                                            }
                                        </td>
                                        <td className='mid'><DeleteConfirmModal 
                                                                deleteFunction={deleteStory} 
                                                                id={story._id} 
                                                                icon='bi bi-trash'
                                                                size='fs-5'
                                                                />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </Table>

                            <div className='d-flex justify-content-center'>
                                <Paginate 
                                    variant='dark'
                                    forURL = {'story'}
                                    pages = {pages} 
                                    page={page} 
                                    keyword={keyword ? keyword : ''}/>
                            </div>
                        </Col>

                        
                    </Row>               
                    
                </div>
            }
            
        </>
    )
}

export default StoryScreen
