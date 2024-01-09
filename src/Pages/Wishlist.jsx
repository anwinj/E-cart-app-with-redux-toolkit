import React from 'react'
import {Row,Col,Button,Card,Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/Slices/wishlistSlice'
import { addtoCart } from '../Redux/Slices/cartSlice'
import Header from '../Components/Header'

function Wishlist() {

    const wishlist = useSelector(state=>state.wishlistSlice.wishlist)
    const dispatch = useDispatch()

    const handleCart = (product) =>{
      dispatch(removeFromWishlist(product.id))
      dispatch(addtoCart(product))
    }

  return (
    <>
        <Header/>
        <Row className='mt-5 container'>
                    <h3 className='mb-4 ms-5 text-danger'>Wishlist</h3>
                    {
                        wishlist?.length>0?wishlist.map((product)=>(
                            <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
                                <Card className='shadow rounded' style={{ width: '18rem' }}>
                                 <Link to={`/view/${product.id}`}>
                                <Card.Img style={{height:'270px'}} variant="top" src={product.thumbnail} />
                                    </Link>
                                    <Card.Body>
                                <Card.Title className='d-flex justify-content-center '>{product.title}</Card.Title>
                                 <div className='d-flex justify-content-between mt-4'>  
                                    <Button onClick={()=>dispatch(removeFromWishlist(product.id))} className='btn me-3 btn-light'><i class="fa-solid fa-heart-circle-xmark text-danger"></i></Button>
                                    <Button onClick={()=>handleCart(product)} className='btn btn-light'><i class="fa-solid fa-cart-shopping fa-lg text-warning"></i></Button>
                                    </div>
                                      </Card.Body>
                                    </Card>
                             </Col>
                        )):
                        <div className='text-center'>
                            <img style={{height:'300px'}} src="src\images\kGZag9os6n-unscreen.gif" alt="" />
                            <h1 className='m-5'>Wishlist Empty</h1>
                        </div>
                    }
                    
        </Row>
    </>
  )
}

export default Wishlist