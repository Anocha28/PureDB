import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Row, Col, Table, } from 'react-bootstrap'
import { listUser, deleteUser } from '../Actions/userActions'
import Loader from '../Components/Loader'
import UserCreateModal from '../Modals/UserCreateModal'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import UserEditModal from '../Modals/UserEditModal'

const UsersScreen = () => {
    const dispatch = useDispatch()
    const {loading, error, users} = useSelector(state=> state.userList)
    const {success: createSuccess} = useSelector(state=> state.userCreate)
    const {success: deleteSuccess} = useSelector(state=> state.userDelete)
    const {success: editSuccess} = useSelector(state=> state.userEdit)

    useEffect(()=>{
        dispatch(listUser())
    },[dispatch, createSuccess, deleteSuccess, editSuccess])

  
    return (
        <>
            <div className='brandHeading'> 
                <div className='d-flex flex-wrap'> 
                    <div className='mx-2 my-1'>            
                        <UserCreateModal />  
                    </div> 
                </div>
            </div>
            
            {loading ? <Loader /> :
            error ? <Alert variant='danger' className='text-center' style={{widht: '500px'}}>{error}</Alert> :
            users.length === 0 ? <Alert variant='info'>No user to show.</Alert> : 
                <div className='p-3'> 
                <h1 className='text-center mb-3'>User List</h1>
                    <Row>
                        <Col lg={6} md={6} s={6} xs={12}>
                            <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                <th className='mid'>Name</th>
                                <th className='mid'>Email</th>
                                <th className='mid'>Admin</th>
                                <th className='mid'>Edit</th>
                                <th className='mid'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index)=> (
                                    <tr key={index}>
                                        <td className='mid'>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className='mid'>{user.isAdmin && <i className="bi bi-check-lg"></i>}</td>
                                        <td className='mid'><UserEditModal user={user} /></td>
                                        <td className='mid'><DeleteConfirmModal 
                                            deleteFunction={deleteUser} 
                                            id={user._id} 
                                            icon={`bi bi-trash`}
                                            size={`fs-5`}
                                            /></td>
                                    </tr>
                                ))}
                            </tbody>
                            </Table>
                        </Col>
                    </Row>               
                    
                </div>
            }
            
        </>
    )
}

export default UsersScreen
