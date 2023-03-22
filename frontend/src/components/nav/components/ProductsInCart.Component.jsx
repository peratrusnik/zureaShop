import ProductInCartComponent from './ProductInCart.Component';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ProductsInCartComponent = ({ hideCartHolder }) => {
	const cart = useSelector((state) => state.cartStore.cart);

	const [cartLength, setCartLength] = useState(cart.length);

	useEffect(() => {
		setCartLength(cart.length);
	}, [cart]);

	let productsInCartList = cart.map((product, index) => {
		return (
			<ProductInCartComponent
				product={product}
				key={index}
				index={index}
			/>
		);
	});

	return (
		<>
			<div
				className={
					cartLength > 3
						? 'products-in-cart-wrapper scrollBar'
						: 'products-in-cart-wrapper'
				}
				onClick={() => hideCartHolder()}>
				{productsInCartList}
			</div>
		</>
	);
};

export default ProductsInCartComponent;
