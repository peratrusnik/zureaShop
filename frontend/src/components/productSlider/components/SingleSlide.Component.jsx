import React, { useEffect, useState } from 'react';
import CartBoxOnHoverComponent from './CartBoxOnHover.Component';
import VoteStarsComponent from './VoteStars.Component';
import noImage from '../../../assets/img/noImage.png'
import { Link } from 'react-router-dom';
import ButtonComponent from '../../../UIkit/Button.Component';
import { addToCart } from '../../../redux/cart.slicer';
import { useDispatch } from 'react-redux';

function SingleSlideComponent({ ad }) {

    const dispatch = useDispatch()
    
    const toggleEffect = () => {        
        setTimeout(() => {
            let cart = document.querySelector('.cartInfo-with-products');
            cart.style.cssText = `
            visibility: visible;
            top: 100%;
            opacity: 1;
            z-Index: 95;
            `
        }, 500)
        setTimeout(() => {
            let cart = document.querySelector('.cartInfo-with-products');
            cart.style.cssText = ``            
        },3000)              
    }
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        toggleEffect()
    }
    return (
        <div className='card slider-card'>
            <div className="imgWrapper">
                <Link to={`/productDetails/${ad._id}`}>
                    <span>
                        <img src={ad.imgUrl || noImage} />                        
                    </span>
                    <span className='imgHover'>
                        <img src={ad.imgUrl || noImage} />                        
                    </span>
                </Link>              
                <CartBoxOnHoverComponent/>   
            </div>            
            <Link to={`/productDetails/${ad._id}`}><h3 className='title'>{ad.title.slice(0, 25)}</h3></Link>
            <div className="price-stars-wrapper">
                <div className="price-content">                                
                    <h4 className='price'>${ad.price}</h4>
                </div>
                <div className="comment-note">
                    <VoteStarsComponent/>
                </div>
            </div>
            <ButtonComponent
                btnText="Add to cart"
                btnClick={() => dispatch(addToCart(ad)) && goToTop()}
            />
        </div>
    );
}

export default SingleSlideComponent;