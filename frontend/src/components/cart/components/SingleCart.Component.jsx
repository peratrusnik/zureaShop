import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setPrice } from '../../../redux/cart.slicer';

function SingleCartComponent({ item, index }) {
	const dispatch = useDispatch();
	return (
		<div className='singleCartProduct'>
			<div className='leftInfo'>
				<img
					src={item.imgUrl}
					alt={item.title}
					className='singleCart-img'
				/>
				<div className='description'>
					<p>{item.title}</p>
					<p>Category: {item.category}</p>
				</div>
			</div>
			<div className='desc-info'>
				<p>${item.price}</p>
				<div className='singleCount'>
					<div
						className='shevronDown-wrapper'
						onClick={() =>
							dispatch(setPrice({ increment: -1, index }))
						}>
						<FaChevronDown />
					</div>

					<p>{item.count}</p>

					<div
						className='shevronUp-wrapper'
						onClick={() =>
							dispatch(setPrice({ increment: +1, index }))
						}>
						<FaChevronUp />
					</div>
				</div>
				<p className='subtotal'>${item.cartTotal}</p>
			</div>
		</div>
	);
}

export default SingleCartComponent;
