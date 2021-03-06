
import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Button,Row, Col , ListGroup, Image, Card} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import CheckoutStep from '../components/CheckoutStep'
import Message from '../components/Message'
import { createOrder } from '../action/orderAction'

const PlaceorderScreen = () => {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Calcu prices
    cart.itemsPrice =  Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty,0).toFixed(2))
    cart.shippingPrice =  cart.itemsPrice > 100 ? 0 : 100
    cart.taxPrice =  Number((0.15 * cart.itemsPrice).toFixed(2))
    cart.totalPrice =  Number((cart.itemsPrice  + cart.shippingPrice + cart.taxPrice).toFixed(2))
    
    const orderCreate= useSelector(state => state.orderCreate)
    const {order, success, error, loading} = orderCreate

    useEffect(()=>{          
        if( success ){
          navigate(`/order/${order._id}`)    
        }

        // eslint-disable-next-line
    },[navigate, success, loading])
    const placeOrderHandler = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddrees: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <>
             <CheckoutStep step1 step2 step3 step4/>
             <Row>
                <Col md = {8}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city}{' '},
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            { cartItems.length === 0 ? <Message>Your cart is Empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => 
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Message variant= 'danger'>{error}</Message>}
                                </ListGroup.Item>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                type='button' 
                                className='btn-block' 
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceorderScreen
