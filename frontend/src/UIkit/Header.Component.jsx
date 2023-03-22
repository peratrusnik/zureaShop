import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContainerComponent from "./Container.Component";

const HeaderComponent = ({ title, subtitle, titlePosition, banner }) => {
    
    const imgWrapper =          
            (
                banner === 'contact' ?
                    { backgroundImage: "url(https://www.shutterstock.com/image-photo/white-popular-contact-web-icons-260nw-1617540217.jpg)" }
                    :        
                    { backgroundImage: "url(https://templatebeta.com/Prestashop/PRS01/TB_ps_fashion_zurea_122/themes/TB_122_PS_Fashion_Zurea/assets/img/templatebeta/shop-title.jpg)" }
            )
        
    // case of titlePosition: left-top, left-center, left-bottom, center-top, center-center, 
    // center-bottom, right-top, right-center, right-bottom 
    return (
        <ContainerComponent isFluid={true}>
            <div className="col-12 img-wrapper" style={imgWrapper}>
                <div className={'container zu-header-wrapper ' + titlePosition}>
                    <h1>{title}</h1>
                    <h5 className="subtitle"><Link to={'/'}>Home</Link><span> / </span><Link to={'#'}>{ subtitle }</Link></h5>
                </div>
            </div>
        </ContainerComponent>
    )
}

export default HeaderComponent