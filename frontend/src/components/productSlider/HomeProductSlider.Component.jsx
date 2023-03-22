import React from 'react';
import MainSlideComponent from './components/MainSlide.Component';
import '../../assets/scss/homeProductSlider.scss'
import ContainerComponent from "../../UIkit/Container.Component";

function HomeProductSliderComponent() {
    return (
        <ContainerComponent>
            <div className="product-slider-wrapper">
                <div className="product-slider">
                    <div className="main-title-wrapper">
                        <h2>WE LOVE TREND</h2>
                    </div>
                    <div className="slider-wrapper">
                        <MainSlideComponent/>
                    </div>
                </div>
            </div>
        </ContainerComponent>

    );
}

export default HomeProductSliderComponent;