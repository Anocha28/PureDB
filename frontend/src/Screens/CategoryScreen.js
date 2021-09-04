import React, {useEffect, useState} from 'react'
import { Route, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Table, Row, Col, Alert, Button } from 'react-bootstrap'
import Loader from '../Components/Loader'
import Paginate from '../Components/Paginate'
import SearchBox from '../Components/SearchBox'
import CategoryCreateModal from '../Modals/CategoryCreateModal'
import CategoryEditModal from '../Modals/CategoryEditModal'
import { listCategory, deleteCategory } from '../Actions/categoryActions'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'



const CategoryScreen = () => {
    const perPageList = [ 20, 50, 100]
    const {keyword} = useParams() 
    const pageNumber = useParams().pageNumber || 1
    const dispatch = useDispatch()
    const [perPage, setPerPage] = useState(20)
    const [sortBy, setSortBy] = useState('')

    const {loading, error, categories, page, pages} = useSelector(state=> state.categoryList)
    const {success: successEdit} = useSelector(state=> state.categoryEdit)
    const {success: successCreate} = useSelector(state=>state.categoryCreate)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = useSelector(state=>state.categoryDelete)

    useEffect(()=>{
        dispatch(listCategory(keyword, pageNumber, perPage, sortBy))
    },[dispatch, successCreate, successEdit, successDelete, keyword, pageNumber, perPage, sortBy])


    return (
        <>
            <div className='brandHeading'>
                <div className='d-flex flex-wrap'> 
                    <div className='mx-2 my-1'>            
                        <CategoryCreateModal />
                    </div>  
                    <div className='mx-2 my-1'>
                        <Route render={({history})=><SearchBox forURL={'category'} history={history} />} /> 
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
            categories.length === 0 ? <Alert variant='info'>No category to show.</Alert> : 
                <div className='p-3'> 
                <h1 className='text-center mb-3'>Category List</h1>
                    <Row>
                        <Col>
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
                                <th className='mid d-none d-sm-table-cell'>Description
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('description')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid d-none d-sm-table-cell'>Main Category
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('mianCategory')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid d-none d-sm-table-cell'>Custom Code
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('customCode')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid d-none d-sm-table-cell'>Custom Description
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('customDescription')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid'>Edit</th>
                                <th className='mid'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index)=> (
                                    <tr key={index}>
                                        <td className='mid'>{category.code}</td>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>{category.mainCategory}</td>
                                        <td className='mid'>{category.customCode}</td>
                                        <td className='mid'>{category.customDescription}</td>
                                        <td className='mid'><CategoryEditModal category={category} /></td>
                                        <td className='mid'><DeleteConfirmModal 
                                                                deleteFunction={deleteCategory} 
                                                                id={category._id} 
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
                                    forURL = {'category'}
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

export default CategoryScreen
