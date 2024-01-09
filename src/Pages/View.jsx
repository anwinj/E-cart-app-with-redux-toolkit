import React, { useEffect, useState } from 'react'
import {Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/Slices/wishlistSlice'
import { addtoCart } from '../Redux/Slices/cartSlice'
import Header from '../Components/Header'

function View() {

    const {id} = useParams()
    const {loading} = useSelector((state)=>state.productSlice)
    const [product,setProduct] = useState({})
    const {wishlist} = useSelector((state)=>state.wishlistSlice)
    const dispatch = useDispatch()
    // console.log(id);

    useEffect(()=>{
        const products = JSON.parse(localStorage.getItem("products"))
        setProduct(products.find(product=>product.id==id))
    },[])
    // console.log(product);
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
        <Header/>
        <div>
            {
                loading?<div className='text-center mt-5 mb-5'><Spinner animation="border" variant="primary" /></div>:
                <div className="row mt-5 container">
                <div className="col-md-4 ms-5 mb-5">
                    <img style={{height:'500px',width:'600px'}} src={product.thumbnail} alt="" />
                </div>
                <div className="col-md-2"></div>
                <div className="col md-6 mt-5">
                    <p>PID: {product.id}</p>
                    <h1>{product.title}</h1>
                    <p style={{fontSize:'30px'}} className='fw-bolder'>$ {product.price}</p>
                    <p><span>Product Description</span> {product.description}</p>
                    <div className='d-flex justify-content-between '>  
                        <Button onClick={()=>handleWishlist(product)} className='btn me-3 btn-light '><i class="fa-solid fa-heart fa-lg text-danger"></i> WishList</Button>
                        <Button onClick={()=>dispatch(addtoCart(product))} className='btn btn-light me-5 '><i class="fa-solid fa-cart-shopping fa-lg text-warning"></i> Add to Cart</Button>
                    </div>
                </div>
            </div>
            }
            
        </div>
    </>
  )
}

export default View