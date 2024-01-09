import React, { useEffect, useState } from 'react'
import { Col,Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCart } from '../Redux/Slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'

function Cart() {

    const cart = useSelector(state=>state.cartReducer)
    const [cartAmount,setCartAmount] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(cart?.length>0){
            setCartAmount(cart.map(product=>product.totalPrice).reduce((p1,p2)=>p1+p2))
        }
        else{
            setCartAmount(0)
        }
    },[cart])

    const handleCheckout = ()=>{
        alert("Your Order has been placed successfully.. happy shopping!!!")
        dispatch(emptyCart())
        navigate('/')
    }

    const handleDecrementCart = (product)=>{
        dispatch(decQuantity(product))
        if(product.quantity==1){
            dispatch(removeCart(product.id))
        }
    }

  return (
    <>
        <Header/>
        <div className='container m-5'>
            <h3 className='text-danger'>Cart Summary</h3>
    
            {
                cart?.length>0?<div className="row mt-5 mb-5">
                <div className="col md-8">
                    <table className='table border shadow'>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart?.map((product,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{product.title}</td>
                                        <td><img style={{width:'150px',height:'100px'}} src={product.thumbnail} alt="" /></td>
                                        <td><div className='d-flex'>
                                                <button onClick={()=>handleDecrementCart(product)} className='btn'>-</button>
                                                <input style={{width:'50px'}} className='form-control' type="text" readOnly value={product.quantity} />
                                                <button onClick={()=>dispatch(incQuantity(product))} className='btn'>+</button>
                                            </div>
                                        </td>
                                        <td>$ {product.totalPrice}</td>
                                        <td><button onClick={()=>dispatch(removeCart(product.id))} className='btn'><i class="fa-solid fa-trash text-danger"></i></button></td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                        
                    </table>
    
                    <div className='float-end p-3'>
                        <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>EMPTY CART</button>
                        <Link to ={'/'} className='btn btn-info'>SHOP MORE</Link>
                    </div>
                </div>
    
    
                <div className="col md-4 border shadow ms-5 p-4 d-flex flex-column justify-content-center align-items-center">
                    <h5 className='mt-3'>No of Products: {cart?.length}</h5>
                    <h3 className='mt-2 mb-3'>Price: <span className='text-danger'>$ {cartAmount}</span></h3>
                    <button onClick={handleCheckout} className='btn btn-success mt-2 w-100'>Checkout</button>
                </div>
            </div>:
    
            <div className='text-center'>
                <img style={{height:'300px'}} src="src\images\kGZag9os6n-unscreen.gif" alt="" />
                <h1 className='m-5'>Cart Empty</h1>
            </div>
    
            }
            
        </div>
    </>
  )
}

export default Cart