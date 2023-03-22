import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// ICONS
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {HiHeart} from 'react-icons/hi';
import {IoMdShuffle} from 'react-icons/io';
import HeaderComponent from '../headerSection/Header.Component';
import {getSingleDetailProduct} from '../../services/product.service';
import {addToCart} from '../../redux/cart.slicer';
import Stars from '../stars/Stars.jsx';
import ModalAddToCartComponent from './components/ModalAddToCart.Component';
import ProductZoomComponent from './components/ProductZoom.Component';
import SocialNetworkLinksComponent from './components/SocialNetworkLinks.Component';
import ContainerComponent from '../../UIkit/Container.Component';

function ProductDetailComponent() {
    let {id} = useParams();
    const [singleProduct, setSingleProduct] = useState({});
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        getSingleDetailProduct(id).then((data) =>
            setSingleProduct(data.data[0])
        );
    }, [id]);

    function handleCount(shevron) {
        // if (shevron) {
        // 	setCount((prevState) => prevState + 1);
        // } else {
        // 	if (count > 1) {
        // 		setCount((prevState) => prevState - 1);
        // 	}
        // }

        if (count + shevron > 0) {
            setCount(count + shevron);
        }
    }

    const handleAddToCart = () => {
        singleProduct.count = count;
        dispatch(addToCart(singleProduct));
    };

    return (
        <>
        <ContainerComponent isFluid={false}>
            <HeaderComponent title={singleProduct?.title}/>
            <div className='productDetail'>
                <ProductZoomComponent singleProduct={singleProduct}/>
                <div className='rightProductInfo'>
                    <h2 className='title'>{singleProduct?.title}</h2>
                    <Stars
                        rating={singleProduct?.rating}
                        all={false}
                        ratingStar={singleProduct?.rating}
                    />
                    <p className='price'>${singleProduct?.price}</p>
                    <p className='desc'>{singleProduct?.description}</p>
                    <div className='quantity'>
                        <p>Quantity</p>
                        <div className='counter'>
                            <div
                                className='shevronDown-wrapper'
                                onClick={() => handleCount(-1)}>
                                <FaChevronDown/>
                            </div>

                            <p>{count}</p>

                            <div
                                className='shevronUp-wrapper'
                                onClick={() => handleCount(1)}>
                                <FaChevronUp/>
                            </div>
                        </div>
                    </div>
                    <div className='productAction'>
                        <ModalAddToCartComponent
                            handleAddToCart={handleAddToCart}
                            singleProduct={singleProduct}
                            count={count}
                        />
                        <div className='wishlist'>
                            <div className='custom-title-wishlist'>
                                <div className='helper-triangle'></div>
                                Add to Wishlist
                            </div>

                            <HiHeart/>
                        </div>
                        <div className='compare'>
                            <div className='custom-title-compare'>
                                <div className='helper-triangle'></div>
                                Compare
                            </div>

                            <IoMdShuffle/>
                        </div>
                    </div>
                    <ul className='social-network'>
                        <li>
                            <SocialNetworkLinksComponent networkName="Facebook"/>
                        </li>
                        <li>
                            <SocialNetworkLinksComponent networkName="Twitter"/>
                        </li>
                        <li>
                            <SocialNetworkLinksComponent networkName="Instagram"/>
                        </li>
                    </ul>
                </div>
                </div>
            </ContainerComponent>
        </>
    );
}

export default ProductDetailComponent;
