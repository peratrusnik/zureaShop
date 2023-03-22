import React, {useEffect} from 'react';
import TopTwoProductsComponent from '../components/TopTwoProducts/TopTwoProducts.Component';
import BasicInfo from "../components/ourBasicInfo/Basic.Info";
import ProductSliderComponent from '../components/productSlider/HomeProductSlider.Component';

import {useDispatch} from "react-redux";
import {toggleModal} from "../redux/modal.slicer";
import RandomComponents from "../components/category/Random.Components";
import Slide from "../components/homePageSLider/Slide";
import TestimonialComponent from '../components/Testimonial/Testimonial.Component';
import NewsletterModalComponent from '../components/newsletterModal/NewsletterModal.Component';
function HomePageComponent() {
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(toggleModal(true));
        }, 5000);
    }, []);

    return (
        <>
            <Slide />
            <RandomComponents />
            <ProductSliderComponent/>
            <TopTwoProductsComponent />
            <TestimonialComponent/>
            <BasicInfo />
            <NewsletterModalComponent/>
        </>

    );
}

export default HomePageComponent;
