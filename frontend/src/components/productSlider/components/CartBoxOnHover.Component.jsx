import React from 'react';
import {AiFillEye, AiFillHeart} from 'react-icons/ai'
import {TbArrowsLeftRight} from 'react-icons/tb'

function CartBoxOnHoverComponent() {
    return (
        <div className="product-hover-btn">
            <div className="product-quick-btns">
                <a href="" title='Quick view'
                    className='btn cart-box-btn'>
                    <AiFillEye />
                </a>
            </div>
            <div className="product-compare-btn">
                <a href="" title='Compare' className='btn cart-box-btn'>
                    <TbArrowsLeftRight />
                </a>
            </div>
            <div className="product-wishlist">
                <a href="" title='Add To Wishlist' className='btn cart-box-btn'>
                    <AiFillHeart />
                </a>
            </div>
        </div>
    );
}

export default CartBoxOnHoverComponent;