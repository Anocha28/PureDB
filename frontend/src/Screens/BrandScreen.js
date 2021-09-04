
import React, {useEffect} from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listBrand, deleteBrand } from '../Actions/brandActions'
import Loader from '../Components/Loader'
import BrandCreateModal from '../Modals/BrandCreateModal'
import BrandEditModal from '../Modals/BrandEditModal'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'

const BrandScreen = () => {
    const dispatch = useDispatch()
    const {loading, error, brands} = useSelector(state=>state.brandList)
    const {success: createSuccess} = useSelector(state=>state.brandCreate)
    const {success: editSuccess} = useSelector(state=>state.brandEdit)
    const {loading: deleteLoading, error: deleteError, success: deleteSuccess} = useSelector(state=>state.brandDelete)

    
    useEffect(()=>{
        if(deleteError){
            toast.error(deleteError)
            return
        }
        dispatch(listBrand())
    },[dispatch, createSuccess, editSuccess, deleteError, deleteSuccess])


    return (
        <>
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

            <div className='brandHeading'>                
                <BrandCreateModal />                
            </div>
            
            {loading || deleteLoading ? <Loader /> :
            error ? <Alert variant='danger' className='text-center' style={{widht: '500px'}}>{error}</Alert> :
                <div>                
                <h1 className='text-center mb-3'>Brand List</h1>
                <Row className=' p-3'>
                    {brands.map((brand, index)=> (
                        <Col xs={12} s={12} md={12} lg={6} className='brandCard' key={index}>
                            <div 
                                className={`border card rounded shadow`}
                                style={{height: '180px'}} 
                                >
                                <div className='brandImg border-end d-flex justify-content-center'>
                                    <img 
                                        src={brand.logo} 
                                        alt={brand.name} 
                                        className='imgCenter p-2'
                                        />
                                </div>

                                <div className='brandDetail'>
                                    <h3>Name : {brand.name}</h3>
                                    <p>Created on : {brand.createdAt.split('T')[0]}</p>
                                </div>

                                <div className='brandDelete'>
                                    <DeleteConfirmModal deleteFunction={deleteBrand} id={brand._id} />
                                </div>

                                <div className='brandEdit'>
                                    <BrandEditModal brand={brand} />
                                </div>
                            </div>
                        </Col>
                    ))}                    
                </Row>              
            </div>
            }
            
        </>
    )
}

export default BrandScreen
