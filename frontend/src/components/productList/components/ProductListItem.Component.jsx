import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {addToCart} from '../../../redux/cart.slicer';
import ButtonComponent from "../../../UIkit/Button.Component";
import noImage from '../../../assets/img/noImage.png'
import ContainerComponent from "../../../UIkit/Container.Component";

const ProductListItemComponent = (props) => {
    const {product, isEditMode} = props
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(isEditMode);
    }, [isEditMode])

    const onRedirect = () => {
        if (isEditMode)
            return navigate(`/product/${product._id}/edit`)
        // todo: add to cart
    }

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

    //todo: on click redirect to /product/:id
    return (
       

        <div className="col-lg-3 col-md-4 col-sm-6 zu-product-item-wrapper">
            <Link to={`/productDetails/${product._id}`}>
                <div className="imgProduct-wrapper">

                <img className="img img-fluid"
                    src={product.imgUrl || noImage }
                    alt="placeholder img" />
                </div>
                <p className="zu-product-item-name">{product.title.slice(0,30)}</p>
                <p className="zu-product-item-price">${product.price}</p>
            </Link>
            {
                isEditMode ? (
                    <button className="zu-product-item-btn" onClick={() => onRedirect()}>
                        Edit
                    </button>
                ) : (
                    // <button
                    //     className='zu-product-item-btn'
                    //     onClick={() => dispatch(addToCart(product))}>
                    //     Add to cart
                    // </button>
                    <ButtonComponent
                    btnText="Add to cart"
                    btnClick={() => dispatch(addToCart(product)) && goToTop()}
                    />
                    )
                }

        </div>
    )
}

export default ProductListItemComponent;
