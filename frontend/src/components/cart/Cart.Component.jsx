import React from 'react';
import { useSelector } from 'react-redux';
import SingleCartComponent from './components/SingleCart.Component';

function CartComponent() {
	const { cart, totalCount, totalPrice } = useSelector(
		(state) => state.cartStore
	);
	return (
		<div className='singleCart'>
			<div className='singleCart-Left'>
				<div className='singleCart-Left-Header'>
					<h3>Product</h3>
					<div className='singleCart-Left-Header-Info'>
						<p>Price</p>
						<p>Quantity</p>
						<p>Subtotal</p>
					</div>
				</div>
				{cart.map((el, index) => {
					return (
						<>
							<SingleCartComponent
								item={el}
								key={index}
								index={index}
							/>
							<hr />
						</>
					);
				})}
			</div>
			<div className='singleCart-Right'>
				<div className='cartHeader'>
					<h3>Cart Total</h3>
				</div>
				<div className='forPay'>
					<h3>Total for pay:</h3>
					<p>${totalPrice}</p>
				</div>
			</div>
		</div>
	);
}

export default CartComponent;
