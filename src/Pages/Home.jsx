import React, { useEffect } from 'react'
import {Row,Col,Button,Card, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../Redux/Slices/productSlice'
import wishlistSlice, { addToWishlist } from '../Redux/Slices/wishlistSlice'
import { addtoCart } from '../Redux/Slices/cartSlice'

function Home() {

    const dispatch = useDispatch()
    const {loading,products,error} = useSelector((state)=>state.productSlice)
    const {wishlist} = useSelector((state)=>state.wishlistSlice)

    useEffect(()=>{
        dispatch(fetchProducts())
    },[])
    const handleWishlist = (product)=>{
        const existingProduct = wishlist.find(item=>item.id==product.id)
        if(existingProduct){
            alert("Item Already in wishlist!!!")
        }
        else{
            dispatch(addToWishlist(product))
        }
    }

  return (
    <>
        <div>
            {
                loading?<div className='text-center mt-5 mb-5'><Spinner animation="border" variant="primary" /></div>:
                <Row  style={{margin:'120px'}} className='mt-5 container'>
                    {
                        products.length>0&&products.map((product)=>(
                            <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
                                <Card className='shadow rounded' style={{ width: '18rem' }}>
                                    <Link to={`view/${product.id}`}>
                                      <Card.Img style={{height:'270px'}} variant="top" src={product.thumbnail} />
                                     </Link>
                                 <Card.Body>
                                      <Card.Title className='d-flex justify-content-center '>{product.title.slice(0,20)}...</Card.Title>
                                     <div className='d-flex justify-content-between mt-4 '>  
                                     <Button onClick={()=>handleWishlist(product)} className='btn me-3 btn-light'><i class="fa-solid fa-heart fa-lg text-danger"></i></Button>
                                    <Button onClick={()=>dispatch(addtoCart(product))} className='btn btn-light'><i class="fa-solid fa-cart-shopping fa-lg text-warning"></i></Button>
                                    </div>
                                </Card.Body>
                             </Card>
                             </Col>
                        ))
                    }
                    
                </Row>
            }
            
        </div>
    </>
  )
}

export default Home