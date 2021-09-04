import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Route, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Row, Col, Table, Button, Form } from 'react-bootstrap'
import { listColor, deleteColor } from '../Actions/colorActions'
import Loader from '../Components/Loader'
import ColorCreateModal from '../Modals/ColorCreateModal'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import ColorEditModal from '../Modals/ColorEditModal'
import SearchBox from '../Components/SearchBox'
import Paginate from '../Components/Paginate'

const ColorScreen = () => {
    const perPageList = [ 20, 50, 100]
    const {keyword} = useParams() 
    const pageNumber = useParams().pageNumber || 1
    const dispatch = useDispatch()

    const [sortBy, setSortBy] = useState('')
    const [perPage, setPerPage] = useState(20)

    const {userInfo} = useSelector(state=>state.userLogin)
    const {loading, error, colors, page, pages} = useSelector(state=> state.colorList)
    const {success: createSuccess} = useSelector(state=> state.colorCreate)
    const {success: deleteSuccess} = useSelector(state=> state.colorDelete)
    const {success: editSuccess} = useSelector(state=> state.colorEdit)

    useEffect(()=>{
        dispatch(listColor(keyword, pageNumber, perPage, sortBy))
    },[dispatch, createSuccess, deleteSuccess, editSuccess, keyword, pageNumber, perPage, sortBy])

    async function ConvertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line !== '') line += ','

                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }

    const handleDownloadThis = async (fileName) => {
        let link = document.createElement("a")
        link.download = `${fileName}.csv`
        let jsonObject = JSON.stringify(colors)
        let file = await ConvertToCSV(jsonObject)
        let blob = new Blob([file], { type: "application/vnd.ms-excel" })
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
    }

    const handleDownloadAll = async (fileName) => {
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }     
        const {data} = await axios.get('/api/colors/all', config)
        let link = document.createElement("a")
        link.download = `${fileName}.csv`
        let jsonObject = JSON.stringify(data)
        let file = await ConvertToCSV(jsonObject)
        let blob = new Blob([file], { type: "application/vnd.ms-excel" })
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
    }

    return (
        <>
            <div className='brandHeading'> 
                <div className='d-flex flex-wrap'> 
                    <div className='mx-2 my-1'>            
                        <ColorCreateModal />  
                    </div> 

                    <div className='mx-2 my-1'>
                        <Route render={({history})=><SearchBox forURL={'color'} history={history} />} /> 
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

                    <div className='mx-2 my-1'>
                        <Form.Select onChange={e=> {
                            if(e.target.value === 'all'){
                                handleDownloadAll('Color_Data_All')
                            } else if (e.target.value === 'this'){
                                handleDownloadThis('Color_Data')
                            } else {
                                return
                            }
                            }}
                            className=''
                            style={{width: '150px'}}
                            >
                            <option>Data Export</option>
                            <option value='all'>All</option>
                            <option value='this'>This Page</option>
                        </Form.Select>
                    </div>
                </div>
            </div>
            
            {loading ? <Loader /> :
            error ? <Alert variant='danger' className='text-center' style={{widht: '500px'}}>{error}</Alert> :
            colors.length === 0 ? <Alert variant='info'>No color to show.</Alert> : 
                <div className='p-3'> 
                <h1 className='text-center mb-3'>Color List</h1>
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
                                <th className='mid'>Map
                                    <Button 
                                        variant='flush' 
                                        className='m-0 p-0'
                                        onClick={()=>setSortBy('map')}
                                        >
                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                    </Button>
                                </th>
                                <th className='mid'>Edit</th>
                                <th className='mid'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colors.map((color, index)=> (
                                    <tr key={index}>
                                        <td className='mid'>{color.code}</td>
                                        <td>{color.name}</td>
                                        <td>{color.map}</td>
                                        <td className='mid'><ColorEditModal color={color} /></td>
                                        <td className='mid'><DeleteConfirmModal 
                                            deleteFunction={deleteColor} 
                                            id={color._id} 
                                            icon={`bi bi-trash`}
                                            size={`fs-5`}
                                            /></td>
                                    </tr>
                                ))}
                            </tbody>
                            </Table>

                            <div className='d-flex justify-content-center'>
                                <Paginate 
                                    variant='dark'
                                    forURL = {'color'}
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

export default ColorScreen
