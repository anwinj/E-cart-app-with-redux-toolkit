import React, { useEffect } from 'react'
import {Row,Col,Button,Card, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, onNavigateNext, onNavigatePrev } from '../Redux/Slices/productSlice'
import wishlistSlice, { addToWishlist } from '../Redux/Slices/wishlistSlice'
import { addtoCart } from '../Redux/Slices/cartSlice'
import Header from '../Components/Header'

function Home() {

    const dispatch = useDispatch()
    const {loading,products,error,productsPerPage,currentPage} = useSelector((state)=>state.productSlice)
    const {wishlist} = useSelector((state)=>state.wishlistSlice)
    const totalPages = Math.ceil(products?.length/productsPerPage)
    const indexOfLastItem = currentPage * productsPerPage
    const indexOfFirstItem = indexOfLastItem - productsPerPage
    const visibleCards = products?.slice(indexOfFirstItem,indexOfLastItem)

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

    const navigatePrev = ()=>{
        if(currentPage!=1){
            dispatch(onNavigatePrev())
        }
    }

    const navigateNext = ()=>{
        if(currentPage!=totalPages){
            dispatch(onNavigateNext())
        }
    }

  return (
    <>
        <Header insideHome/>
        <div>
            {
                !loading&&error?<div><h3 className='text-danger text-center mt-5 fw-bolder'>{error}</h3></div>:null
            }
            {
                loading?<div className='text-center mt-5 mb-5'><Spinner animation="border" variant="primary" /></div>:
                <Row  style={{margin:'120px'}} className='mt-5 container'>
                    {
                        products.length>0?visibleCards.map((product)=>(
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
                        )): !error&&<div>
                                <h3 className='text-danger text-center mt-5 fw-bolder'>Product Not Found....</h3>
                            </div>
                    }
                    <div className='d-flex justify-content-center align-items-center mt-3'>
                        <button onClick={navigatePrev} className='btn btn-link'><i class="fa-solid fa-angles-left fa-2xl"></i></button>
                        <h4> {currentPage} of {totalPages} </h4>
                        <button onClick={navigateNext} className='btn btn-link'><i class="fa-solid fa-angles-right fa-2xl"></i></button>
                    </div>
                    
                </Row>
            }
            
        </div>
    </>
  )
}

export default Home