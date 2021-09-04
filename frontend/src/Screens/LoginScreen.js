import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Button, FloatingLabel, Spinner} from 'react-bootstrap'
import { login } from '../Actions/userActions';


const LoginScreen = ({history}) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [warning, setWarning] = useState(false)

    const {loading, error, userInfo} = useSelector(state=> state.userLogin)

    useEffect(()=>{
        if(userInfo){
            history.push('/style')
        }
        if(error){
            toast.error(error)
            return
        }
    },[userInfo, history, error])
    

    const handleSubmit = (e)=> {
        e.preventDefault()
        if(email === '' && password === ''){
            setWarning(true)
            toast.error('Please fill up required.')
            return
        }
        dispatch(login(email, password))
    }

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

        <Form onSubmit={handleSubmit} className='m-auto border border-3 shadow p-3 mt-5 login'>        
        <h3 className='text-center my-3'>PureDB Login</h3>
        {loading && <div className='d-flex justify-content-center'><Spinner animation="border" /></div>}
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
        
            <Form.Control 
                type="email" 
                placeholder="name@example.com"
                className={warning && 'is-invalid'}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}

                />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control 
            type="password" 
            placeholder="Password"
            className={warning && 'is-invalid'}
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}

            />
        </FloatingLabel>    
        
        <div className='d-grid my-4'>
            <Button 
                variant='outline-dark'
                type='submit'
            >Login</Button> 
        </div>      
        </Form>
        </>
    )
}

export default LoginScreen
