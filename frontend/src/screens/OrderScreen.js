
import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row, Col , ListGroup, Image, Card} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../action/orderAction'

const OrderScreen = () => {
    const {id} = useParams();
    console.log(id);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
   
    const orderDetails= useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails
    if(!loading){
        order.itemsPrice =  Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty,0).toFixed(2))
    }
    useEffect(()=>{     
        if(!order || order._id !== id )     
        {
            dispatch(getOrderDetails(id))
        }
    },[order, id, dispatch])
    
    return loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> 
    :(
        <>
             <h1> Order code: {order._id}</h1>
             <Row>
                <Col md = {8}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong> <a href = {`mailto: ${order.user.email}`}> {order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddrees.address},
                                {order.shippingAddrees.city}{' '},
                                {/* {order.shippingAddrees.postalCode},{' '} */}
                                {order.shippingAddrees.country}
                            </p>
                            <p>
                               {order.isDeliverd? <Message variant='success'>Delivered on {order.deliverdAt}</Message>
                               : <Message variant='danger'>Not Delivered</Message> }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            <p>
                               {order.isPaid? <Message variant='success'>Paid on {order.paidAt}</Message>
                               : <Message variant='danger'>Not Paid</Message> }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            { order.orderItems.length === 0 ? <Message>Your cart is Empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => 
                                        (<ListGroup.Item key = {index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md= {4}>
                                                    {item.qty} x ${item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Sumary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen