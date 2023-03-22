import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

/***
How to use:
 - rating props is Number of total rating of product
 - ratingStar props is Object of all rating breakdown
 - size props is Number and represent relative font size of parent element - default is 1
 - all props is Boolean and determine how to display
    - true - display details of rating by number stars and display percentage
    - false - display rating present as stars
 ***/
function Stars({ rating, ratingStar, size = 1, all = true }) {
	const fillStar = (num) =>
		Array(5)
			.fill(num)
			.map((el, index) =>
				index < num ? (
					<BsStarFill className='filled' key={index} />
				) : (
					<BsStar key={index} />
				)
			);
	if (all) {
		return (
			<div className='stars-wrapper'>
				<ul className='star-list' style={{ fontSize: size + 'em' }}>
					<li>
						<span className='star'>{fillStar(1)}</span>
						<span>{ratingStar.one_star.percentage}%</span>
					</li>
					<li>
						<span className='star'>{fillStar(2)}</span>
						<span>{ratingStar.two_star.percentage}%</span>
					</li>
					<li>
						<span className='star'>{fillStar(3)}</span>
						<span>{ratingStar.three_star.percentage}%</span>
					</li>
					<li>
						<span className='star'>{fillStar(4)}</span>
						<span>{ratingStar.four_star.percentage}%</span>
					</li>
					<li>
						<span className='star'>{fillStar(5)}</span>
						<span>{ratingStar.five_star.percentage}%</span>
					</li>
				</ul>
			</div>
		);
	} else {
		let numFill = Math.floor(rating);
		let starsArr = [];
		for (let i = 0; i < numFill; i++) {
			starsArr.push(<BsStarFill className='filled' key={i} />);
		}
		if (rating - numFill > 0) {
			starsArr.push(
				<BsStarHalf className='half' key={starsArr.length} />
			);
		}
	

		let currentStarsArrLength = starsArr.length;
		for (let i = 0; i < 5 - currentStarsArrLength; i++) {
			starsArr.push(
				<BsStar className='empty' key={starsArr.length} />
			);
		}
	
		return (
			<div
				style={{ fontSize: size + 'em' }}
				className='stars-wrapper'>
				<span className='star'>{starsArr}</span>
				<span className='reviews'>
					Reviews <span>({rating})</span>
				</span>
			</div>
		);
	}
}

export default Stars;
