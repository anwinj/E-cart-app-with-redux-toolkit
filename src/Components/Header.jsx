import React, { useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {

    const [wishlistCount,setWishlistCount] = useState(0)
    const [cartCount,setCartCount] = useState(0)
    const wishlist = useSelector(state=>state.wishlistSlice.wishlist)
    const cart = useSelector(state => state.cartReducer)

    useEffect(()=>{
        setWishlistCount(wishlist?.length)
        setCartCount(cart?.length)
    },[wishlist,cart])

  return (
    <>
        <div style={{width:'100%',height:'80px'}} className="d-flex bg-primary justify-content-between align-items-center">
            <div className="logo ms-5">
                <Link to={'/'}><img style={{width:'120px'}} src="https://ekartlogistics.com/assets/images/ekWhiteLogo.png" alt="" /></Link>
            </div>

            <div className="buttons me-5 d-flex justify-content-evenly align-items-center ">
                <div className="btn btn-secondary me-4 d-flex justify-content-center align-items-center ">
                   <Link to={'/wishlist'} style={{textDecoration:'none'}} className='d-flex justify-content-center align-items-center text-light'>
                       <i class="fa-solid fa-heart fa-lg text-danger"></i>
                       <h6 className='ms-2'> Wishlist</h6>
                       <Badge className='ms-2' bg="primary">{wishlistCount}</Badge>
                   </Link>
                </div>

                <div className="btn btn-success ">
                    <Link to={'/cart'} style={{textDecoration:'none'}} className='d-flex justify-content-center align-items-center text-light'>
                        <i class="fa-solid fa-cart-shopping fa-lg text-light"></i>
                        <h6 className='ms-2'>Cart</h6>
                        <Badge className='ms-2' bg="primary">{cartCount}</Badge>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header