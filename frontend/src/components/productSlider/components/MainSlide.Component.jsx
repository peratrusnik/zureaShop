import React, {useState, useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import {setRandomProduct} from "../../../redux/product.slicer";
import ShopService from "../../../services/shop.service";
import SliderComponent from "./Slider.Component";

function MainSlideComponent() {

    const [isBest, setIsBest] = useState('');
    const [isRandom, setIsRandom] = useState('active');
    const dispatch = useDispatch()

    useEffect(() => {
        handleRandom()
    }, []);

    const handleRandom = () => {
        ShopService.GetRandomBestAds(14, 'randum')
            .then(res => {
                if (res.status === 200) {
                    dispatch(setRandomProduct(res.data))
                    setIsRandom('active')
                    setIsBest('')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleBest = () => {
        ShopService.GetRandomBestAds(14, 'best')
            .then(res => {
                if (res.status === 200) {
                    dispatch(setRandomProduct(res.data))
                    setIsRandom('')
                    setIsBest('active')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="tab-featured-wrapper">
            <div className="fetured-best-wrapper-link">
                <button className={'randomProducts ' + isRandom} onClick={handleRandom}>Featured Products</button>
                <button className={'bestProducts ' + isBest} onClick={handleBest}>Best Products</button>
            </div>
            <SliderComponent/>
        </div>
    );
}

export default MainSlideComponent;