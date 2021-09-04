import React, {useEffect, useState} from 'react'
import { Route, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Row, Col, Table, Button, Form } from 'react-bootstrap'
import { listStyle } from '../Actions/styleActions'
import Loader from '../Components/Loader'
import StyleCreateModal from '../Modals/StyleCreateModal'
import StyleViewModal from '../Modals/StyleViewModal'
import SearchBox from '../Components/SearchBox'
import Paginate from '../Components/Paginate'

const StyleScreen = () => {
    const perPageList = [ 20, 50, 100]
    const {keyword} = useParams() 
    const pageNumber = useParams().pageNumber || 1
    const dispatch = useDispatch()
    const [sortBy, setSortBy] = useState('')
    const [perPage, setPerPage] = useState(20)
    const {loading, error, styles, page, pages} = useSelector(state=> state.styleList)
    const {success: createSuccess} = useSelector(state=> state.styleCreate)    
    const {success: deleteSuccess} = useSelector(state=> state.styleDelete)
    const {success: editSuccess} = useSelector(state=> state.styleEdit)

    useEffect(()=>{
        dispatch(listStyle(keyword, pageNumber, perPage, sortBy))
    },[dispatch, createSuccess, deleteSuccess, editSuccess, keyword, pageNumber, perPage, sortBy])


    return (
        <>
            <div className='brandHeading'> 
                <div className='d-flex align-content-start flex-wrap'> 
                    <div className='mx-2 my-1'>            
                        <StyleCreateModal />  
                    </div> 

                    <div className='mx-2 my-1'>
                        <Route render={({history})=><SearchBox forURL={'style'} history={history} />} /> 
                    </div> 

                    <div className='mx-2 my-1'>
                        <Form.Select onChange={e => setPerPage(e.target.value)} style={{width: '150px'}}>                     
                            {perPageList.map((p, index)=> (                        
                                <option 
                                key={index}
                                value={p}                            
                                >{p} </option>
                            ))}
                        </Form.Select>  
                    </div>
                    
                </div>
            </div>

            {loading ? <Loader /> :
            error ? <Alert variant='danger' className='text-center' style={{widht: '500px'}}>{error}</Alert> :
            styles.length === 0 ? <Alert variant='info'>No style to show.</Alert> : 
            <div className='p-3'> 
                <h1 className='text-center mb-3'>Style List</h1>
                    <Row>
                        <Col>
                            <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                <th className='mid' style={{width: '100px'}}>Code
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
                                <th className='mid'>Detail</th>
                                <th className='mid d-none d-sm-table-cell'>Description</th>
                                <th className='mid d-none d-sm-table-cell'>Corporate</th>
                                <th className='mid d-none d-sm-table-cell'>Brand</th>
                                <th className='mid d-none d-sm-table-cell'>Category</th>
                                <th className='mid d-none d-sm-table-cell'>Colors</th>
                                <th className='mid d-none d-sm-table-cell'>Vendor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {styles.map((style, index)=> (
                                    <tr key={index}>
                                        <td className='mid'>{style.code}</td>
                                        <td style={{minWidth: '200px'}}>{style.name}</td>
                                        <td className='mid'><StyleViewModal style={style} /></td>  
                                        <td className='overflow-auto d-none d-sm-table-cell' style={{minWidth: '350px'}}>{style.shortDescription && style.shortDescription}</td>                                      
                                        <td className={`${style.corporate && 'bg-info'} d-none d-sm-table-cell`}>{style.corporate && 'Yes'}</td>                                      
                                        <td className='d-none d-sm-table-cell'>{style.brand && style.brand.name}</td>                                      
                                        <td className='d-none d-sm-table-cell'>{style.category && style.category.mainCategory + ' : ' + style.category.name}</td>  
                                        <td className='d-none d-sm-table-cell'>{style.colors.length !== 0 ? style.colors.map((c,idx)=>(
                                            <React.Fragment className='d-flex flex-row'>
                                                <p key={idx} className='d-inline m-0 p-0'>{c.code},</p>
                                            </React.Fragment>
                                        )) : '-'
                                        }
                                        </td>     
                                        <td className='d-none d-sm-table-cell'>{style.vendor && style.vendor.name}</td>                               
                                    </tr>
                                ))}
                            </tbody>
                            </Table>

                            <div className='d-flex justify-content-center'>
                                <Paginate 
                                    variant='dark'
                                    forURL = {'style'}
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

export default StyleScreen
