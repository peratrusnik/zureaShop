import React, {useContext, useEffect, useState} from 'react';
import logo from '../../assets/logo.png';

import { AiOutlineShoppingCart } from 'react-icons/ai';
// component
import NavCartProductComponent from './components/NavCartProduct.Component';
import NavMobileViewComponent from './components/navMobileView/NavMobileView.Component';
import NavDesktopViewComponent from './components/navDesktopView/NavDesktopView.Component';
import NavProfileViewComponent from './components/navProfileView/NavProfileView.Component.jsx';
import NavBarSearchComponent from './components/NavBarSearch.Component';
import { useDispatch, useSelector } from 'react-redux';
import { restoreCart } from '../../redux/cart.slicer';
import {Link} from "react-router-dom";
import {ContextRootDispatch, ContextRootState} from "../../context/RootStore.Context";
function NavComponent() {
	const [widthMob, setWidthMob] = useState(window.innerWidth);
	const [toggleCartView, setToggleViewCart] = useState(false);
	const context = useContext(ContextRootState)
	const dispatchContext = useContext(ContextRootDispatch)
	const { cart, total, totalCount, totalPrice } = useSelector(
		(state) => state.cartStore
	);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log('context...', context);
		console.log('redux...', cart);
	}, [context])

	useEffect(() => {
		window.addEventListener('resize', () =>
			setWidthMob(window.innerWidth)
		);

		if (widthMob >= 990) {
			toggleCart();
			toggleCartProduct();
		}
	}, [widthMob]);

	useEffect(() => {
		if (localStorage.hasOwnProperty('cart')) {
			dispatch(restoreCart(JSON.parse(localStorage.getItem('cart'))));
		}
	}, []);

	const toggleCart = () => {
		dispatchContext({
			...context,
			user: {name:"laza"}
		})
		if (!cart.length) {
			if (widthMob < 990) {
				setToggleViewCart((prevState) => !prevState);
			} else if (widthMob >= 990) {
				setToggleViewCart(false);
			}
		}
	};

	const toggleCartProduct = () => {
		if (cart.length) {
			if (widthMob < 990) {
				setToggleViewCart((prevState) => !prevState);
			} else if (widthMob >= 990) {
				setToggleViewCart(false);
			}
		}
	};

	const showCartInfo = () => {
		if (cart.length) {
			return (
				<NavCartProductComponent
					toggleCartView={toggleCartView}
					setToggleViewCart={setToggleViewCart}
					productsList={totalCount}
					totalPriceCart={total}
					widthMob={widthMob}
					totalPrice={totalPrice}
				/>
			);
		} else {
			return (
				<div
					className={`${
						toggleCartView
							? 'mob_cartInfo-no-products'
							: 'cartInfo-no-products text-center'
					}`}>
					No product add in cart
				</div>
			);
		}
	};

	return (
		<div className='navbar'>
			{/* mobile view start here */}
			<NavMobileViewComponent />
			{/* desktop view */}
			<img src={logo} alt='logoImg' />
			<NavDesktopViewComponent />
			{/* profile and login section */}
			<div className='user'>
				<div className='profile'>
					<NavBarSearchComponent />
					<NavProfileViewComponent />
				</div>
				<div
					className='cart-wrapper'
					onClick={() => toggleCart()}>
					<div
						className='cart'
						title='Cart'
						onClick={() => {
							toggleCartProduct();
						}}>
						<div className='icon-holder'>
							<AiOutlineShoppingCart className='cart-icon-one' />
							<AiOutlineShoppingCart className='cart-icon-two' />
						</div>

						<p>Cart - {totalCount}</p>
					</div>
					{showCartInfo()}
				</div>
			</div>
		</div>
	);
}

export default NavComponent;
