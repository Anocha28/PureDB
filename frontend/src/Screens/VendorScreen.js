import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Row, Col, Table, Button, Form } from 'react-bootstrap'
import { listVendor, deleteVendor } from '../Actions/vendorActions'
import Loader from '../Components/Loader'
import VendorCreateModal from '../Modals/VendorCreateModal'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import VendorEditModal from '../Modals/VendorEditModal'
import SearchBox from '../Components/SearchBox'
import Paginate from '../Components/Paginate'

const VendorScreen = () => {
    const perPageList = [20, 50, 100]
    const { keyword } = useParams()
    const pageNumber = useParams().pageNumber || 1
    const dispatch = useDispatch()

    const [sortBy, setSortBy] = useState('')
    const [perPage, setPerPage] = useState(20)

    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, vendors, page, pages } = useSelector(state => state.vendorList)
    const { success: createSuccess } = useSelector(state => state.vendorCreate)
    const { success: deleteSuccess } = useSelector(state => state.vendorDelete)
    const { success: editSuccess } = useSelector(state => state.vendorEdit)

    useEffect(() => {
        dispatch(listVendor(keyword, pageNumber, perPage, sortBy))
    }, [dispatch, createSuccess, deleteSuccess, editSuccess, keyword, pageNumber, perPage, sortBy])

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
        let jsonObject = JSON.stringify(vendors)
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
        const { data } = await axios.get('/api/vendors/all', config)
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
                        <VendorCreateModal />
                    </div>

                    <div className='mx-2 my-1'>
                        <Route render={({ history }) => <SearchBox forURL={'vendor'} history={history} />} />
                    </div>

                    <div className='mx-2 my-1'>
                        <Form.Select onChange={e => setPerPage(e.target.value)} style={{ width: '150px' }}>
                            {perPageList.map((p, index) => (
                                <option
                                    key={index}
                                    value={p}
                                >{p} </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className='mx-2 my-1'>
                        <Form.Select onChange={e => {
                            if (e.target.value === 'all') {
                                handleDownloadAll('Vendor_Data_All')
                            } else if (e.target.value === 'this') {
                                handleDownloadThis('Vendor_Data')
                            } else {
                                return
                            }
                        }}
                            className=''
                            style={{ width: '150px' }}
                        >
                            <option>Data Export</option>
                            <option value='all'>All</option>
                            <option value='this'>This Page</option>
                        </Form.Select>
                    </div>
                </div>
            </div>

            {loading ? <Loader /> :
                error ? <Alert variant='danger' className='text-center' style={{ widht: '500px' }}>{error}</Alert> :
                    vendors.length === 0 ? <Alert variant='info'>No vendor to show.</Alert> :
                        <div className='p-3'>
                            <h1 className='text-center mb-3'>Vendor List</h1>
                            <Row>
                                <Col lg={6} md={6} s={6} xs={12}>
                                    <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className='mid'>Code
                                                    <Button
                                                        variant='flush'
                                                        className='m-0 p-0'
                                                        onClick={() => setSortBy('code')}
                                                    >
                                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                                    </Button>
                                                </th>
                                                <th className='mid'>Name
                                                    <Button
                                                        variant='flush'
                                                        className='m-0 p-0'
                                                        onClick={() => setSortBy('name')}
                                                    >
                                                        <i className="bi bi-caret-down-fill m-0 p-0"></i>
                                                    </Button>
                                                </th>
                                                <th className='mid'>Edit</th>
                                                <th className='mid'>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendors.map((vendor, index) => (
                                                <tr key={index}>
                                                    <td className='mid'>{vendor.code}</td>
                                                    <td className='mid'>{vendor.name}</td>
                                                    <td className='mid'><VendorEditModal vendor={vendor} /></td>
                                                    <td className='mid'><DeleteConfirmModal
                                                        deleteFunction={deleteVendor}
                                                        id={vendor._id}
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
                                            forURL={'vendor'}
                                            pages={pages}
                                            page={page}
                                            keyword={keyword ? keyword : ''} />
                                    </div>
                                </Col>
                            </Row>

                        </div>
            }

        </>
    )
}

export default VendorScreen
