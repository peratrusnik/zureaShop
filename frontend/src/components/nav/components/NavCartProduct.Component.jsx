import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductsInCartComponent from './ProductsInCart.Component';



const NavCartProductComponent = ({
	productsList,
	totalPriceCart,
	toggleCartView,
	setToggleViewCart,
	widthMob,
	totalPrice,
}) => {
	const hideCartHolder = () => {
		let cart = document.querySelector('.cart-wrapper');
		if (widthMob >= 990) {
			cart.classList.add('hideCart');
			cart.addEventListener('mouseover', () => {
				cart.classList.remove('hideCart');
			});
		} else {
			setToggleViewCart(false);
		}
	};
	
	return (
		<>
			<div
				className={`${
					toggleCartView
						? 'mob_cartInfo-with-products'
						: 'cartInfo-with-products'
				}`}>
				<div className='cart-products-holder'>
					<h5>
						Your Cart: {productsList} Item
						{productsList > 1 ? 's' : null}
					</h5>
					<ProductsInCartComponent hideCartHolder={hideCartHolder} />
					<div className='subtotalHolder'>
						<p>Subtotal</p>
						<p>${totalPrice} </p>
					</div>
				</div>
				<div className='btnGroup'>
					<Link
						to='/cartshop/cart-products'
						className='btnCart'
						onClick={() => {
							hideCartHolder();
						}}>
						View Cart
					</Link>
					<Link
						to='/cartshop/checkout'
						className='btnCheckout'
						onClick={() => {
							hideCartHolder();
						}}>
						Process To CheckOut
					</Link>
				</div>
			</div>
		</>
	);
};

export default NavCartProductComponent;
