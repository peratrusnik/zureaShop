import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

import img1 from "../../assets/images/demo_img_1.jpg";
import img2 from "../../assets/images/demo_img_2.jpg";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import ContainerComponent from "../../UIkit/Container.Component";

const Slide = () => {
  const options = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    rewind: true,
    pagination: false,
    arrows: true,
    autoWidth: true,
    autoHeight: true,
  };
  return (
      <ContainerComponent isFluid={true}>
        <Splide options={options} hasTrack={false}>
          <SplideTrack>
            <SplideSlide className="slide1">
              <img src={img1} alt="" />
              <div className="content">
                <h2>TRENDY SKIRTS</h2>
                <p>UP TO 50% OFF ON TOP BRANDS</p>
                <Link to="/shop" className="shop">
                  SHOP NOW
                </Link>
              </div>
            </SplideSlide>
            <SplideSlide className="slide2">
              <img src={img2} alt="" />
              <div className="content">
                <h2>MEN'S JACKET</h2>
                <p>UP TO 35% OFF ON TOP BRANDS</p>
                <Link to="/shop" className="shop">
                  SHOP NOW
                </Link>
              </div>
            </SplideSlide>
          </SplideTrack>

          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev custom">
              <AiOutlineRight className="arrow" />
            </button>
            <button className="splide__arrow splide__arrow--next custom">
              <AiOutlineRight className="arrow" />
            </button>
          </div>
        </Splide>
      </ContainerComponent>

  );
};

export default Slide;
