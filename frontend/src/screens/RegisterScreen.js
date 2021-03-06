import React , {useState, useEffect}from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import {register} from '../action/userAction'
import FormContainer from '../components/FormContainer'


const RegisterScreen = () => {

    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;
    const redirect = location.search ?  location.search.split('=')[1] : '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword)
        {
            setMessage('Password is not match')
        }
        else{
            dispatch(register(name,email, password))
        }
        
    }
    return (
        <FormContainer>
            <h1> Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    style={{border: '1px solid #999' , outline: 'none'}}
                    type = "name" 
                    placeholder='Enter your name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    style={{border: '1px solid #999' , outline: 'none'}}
                    type = "email" 
                    placeholder='Enter your email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId = 'password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    style={{border: '1px solid #999' , outline: 'none'}}
                    type = "password" 
                    placeholder='Enter your password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId = 'confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    style={{border: '1px solid #999' , outline: 'none'}}
                    type = "password" 
                    placeholder='Confirm password' 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button 
                style={{ marginTop: '10px'}}
                type = 'submit' 
                variant='primary'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Have an Account? {' '}
                <Link to= {redirect ? `/login?redirect=${redirect}` : '/login' } >
                   Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen 
