import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mockUser from '../../mock/mockData.json'
import { Link } from 'react-router-dom';

function TestimonialComponent() {

    const users = mockUser
    const settings =
        {
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
        }
    

    return (
        <div className='container-fluid testimonial-wrapper'>
            <div className="container testimonial">
                <div className="testimonial-slider-inner">
                    <Slider {...settings}>
                        {users.map((user, index) => {
                            return <div key={index} className='userItem text-center'>
                                <img src={user.img}/>
                                <p>{user.comment}</p>
                                <p><Link to={'/'} className='username'>{user.userName}</Link><span>-</span><span>{ user.profession }</span></p>
                            </div>
                        })}
                    </Slider>            
                </div>
            </div>
        </div>       
    );
}

export default TestimonialComponent;