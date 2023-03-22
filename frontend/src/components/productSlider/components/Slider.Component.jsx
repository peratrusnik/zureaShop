import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShopService from '../../../services/shop.service';
import '../../../assets/scss/homeProductSlider.scss'
import {GrNext, GrPrevious} from 'react-icons/gr'
import SingleSlideComponent from './SingleSlide.Component';
import { useDispatch, useSelector } from 'react-redux';
import { setRandomProduct } from '../../../redux/product.slicer';

function SliderComponent() {

    const customeSlider = React.createRef()
    const gotoNext = () => customeSlider.current.slickNext()  
    const gotoPrev = () => customeSlider.current.slickPrev()  
    const { randomProduct } = useSelector(store => store.productStore)
    const dispatch = useDispatch()
    
    useEffect(() => {
        ShopService.GetRandomBestAds(14, 'randum')
            .then(res => {
                if (res.status === 200) {
                    dispatch(setRandomProduct(res.data))
                    console.log(res.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    
    const [sliderSettings, setSliderSettings] = useState(
        {
            infinite: true,
            speed: 250,
            rows:2,
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: false,
            dots: false,
            responsive: [            
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
            ]
            }
    )
    return (
        <div>
            <div className='prev-next-wrapper'>
                <button className='previous' onClick={()=>gotoPrev()}><GrPrevious/></button>
                <button className='next' onClick={()=>gotoNext()}><GrNext/></button>
            </div>
            <Slider {...sliderSettings} ref={customeSlider}>
                {randomProduct && randomProduct.map((ad, index) => {
                    return <SingleSlideComponent key={index} ad={ad} />
                })}            
            </Slider>
        </div>       
    );
}

export default SliderComponent;