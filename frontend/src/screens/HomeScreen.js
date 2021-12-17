import React, { useEffect} from 'react'
// import products from '../products'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Col, Row} from 'react-bootstrap'
import {listProduct} from '../action/productAction'

const HomeScreen = () => {

    const dispatch = useDispatch()
    const productList = useSelector( state => state.productList);
    const {loading, error, products} = productList;
    useEffect( ()=>{
        dispatch(listProduct())
    },[dispatch]);
    console.log(products);

    return (
        <>
            <h1 className='btn-dark'> Lastest Products</h1>
            { loading 
            ? (<Loader/>)
            : error 
            ?(<Message variant={'danger'}>{error}</Message>) 
            :(
            <Row>
                {products.map(product => (
                    <Col key = {product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product= {product}/>
                    </Col>
                ))}
            </Row>
            )}
        </>
    )
}

export default HomeScreen
