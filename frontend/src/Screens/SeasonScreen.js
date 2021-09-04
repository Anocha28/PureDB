import React, {useEffect, useState} from 'react'
import { Route, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Table, Row, Col, Alert, Button } from 'react-bootstrap'
import Moment from 'react-moment'
import Loader from '../Components/Loader'
import Paginate from '../Components/Paginate'
import SearchBox from '../Components/SearchBox'
import SeasonCreateModal from '../Modals/SeasonCreateModal'
import SeasonEditModal from '../Modals/SeasonEditModal'
import { listSeason, deleteSeason } from '../Actions/seasonActions'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'



const SeasonScreen = () => {
    const perPageList = [ 20, 50, 100]
    const {keyword} = useParams() 
    const pageNumber = useParams().pageNumber || 1
    const dispatch = useDispatch()
    const [perPage, setPerPage] = useState(20)
    const [sortBy, setSortBy] = useState('')

    const {loading, error, seasons, page, pages} = useSelector(state=> state.seasonList)
    const {success: successEdit} = useSelector(state=> state.seasonEdit)
    const {success: successCreate} = useSelector(state=>state.seasonCreate)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = useSelector(state=>state.seasonDelete)

    useEffect(()=>{
        dispatch(listSeason(keyword, pageNumber, perPage, sortBy))
    },[dispatch, successCreate, successEdit, successDelete, keyword, pageNumber, perPage, sortBy])


    return (
        <>
            <div className='brandHeading'>
                <div className='d-flex flex-wrap'> 
                    <div className='mx-2 my-1'>            
                        <SeasonCreateModal />
                    </div>  
                    <div className='mx-2 my-1'>
                        <Route render={({history})=><SearchBox forURL={'season'} history={history} />} /> 
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

            {(loading || loadingDelete) ? <Loader /> :
            error ? <Alert variant='danger' className='text-center'>{error}</Alert> :
            errorDelete ? <Alert variant='danger' className='text-center'>{errorDelete}</Alert> :
            seasons.length === 0 ? <Alert variant='info'>No season to show.</Alert> : 
                <div className='p-3'> 
                <h1 className='text-center mb-3'>Season List</h1>
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
                                <th className='mid d-none d-sm-table-cell'>Start
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('start')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid d-none d-sm-table-cell'>End
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('end')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid'>Edit</th>
                                <th className='mid'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seasons.map((season, index)=> (
                                    <tr key={index}>
                                        <td className='mid'>{season.code}</td>
                                        <td className='mid'>{season.name}</td>
                                        <td className='mid d-none d-sm-table-cell'><Moment parse="YYYY-MM-DD" format="DD MMM YYYY">{season.start}</Moment></td>
                                        <td className='mid d-none d-sm-table-cell'><Moment parse="YYYY-MM-DD" format="DD MMM YYYY">{season.end}</Moment></td>
                                        <td className='mid'><SeasonEditModal season={season} /></td>
                                        <td className='mid'><DeleteConfirmModal 
                                                                deleteFunction={deleteSeason} 
                                                                id={season._id} 
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
                                    forURL = {'season'}
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

export default SeasonScreen
