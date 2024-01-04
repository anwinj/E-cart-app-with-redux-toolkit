import React from 'react'
import { Col,Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Cart() {

    const cart = useSelector(state=>state.cartReducer)

  return (
    <div className='container m-5'>
        <h3 className='text-danger'>Cart Summary</h3>

        {
            cart?.length>0?<div className="row mt-5 mb-5">
            <div className="col md-8 border shadow">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Image</th>
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
                                    <td>$ {product.price}</td>
                                    <td><button className='btn'><i class="fa-solid fa-trash text-danger"></i></button></td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                    
                </table>
            </div>


            <div className="col md-4 border shadow ms-5 p-4 d-flex flex-column justify-content-center align-items-center">
                <h5 className='mt-3'>No of Products: 1</h5>
                <h3 className='mt-2 mb-3'>Price: <span className='text-danger'>$560</span></h3>
                <button className='btn btn-success mt-2 w-100'>Checkout</button>
            </div>
        </div>:

        <div className='text-center'>
            <img style={{height:'300px'}} src="src\images\kGZag9os6n-unscreen.gif" alt="" />
            <h1 className='m-5'>Cart Empty</h1>
        </div>

        }
        
    </div>
  )
}

export default Cart