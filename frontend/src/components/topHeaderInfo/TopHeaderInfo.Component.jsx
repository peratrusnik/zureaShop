import React from 'react';
import { Link } from 'react-router-dom';

function TopHeaderInfoComponent() {
	return (
		<div className='topHeader'>
			<div className='container-fluid'>
				<div className='orderInfo'>
					<p>Free Shipping On Order Over $99 </p>

					<div className='rightSection'>
						<div className='dropdown'>
							<button
								className='btn dropdown-toggle'
								type='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'>
								English
							</button>
							<ul className='dropdown-menu'>
								<li>
									<Link className='dropdown-item' to='/'>
										Serbia
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='/'>
										Italiano
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='/'>
										Espanolo
									</Link>
								</li>
							</ul>
						</div>
						<div className='dropdown'>
							<button
								className='btn dropdown-toggle'
								type='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'>
								USD
							</button>
							<ul className='dropdown-menu'>
								<li>
									<Link className='dropdown-item' to='/'>
										EUR
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='/'>
										RSD
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='/'>
										VCD
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TopHeaderInfoComponent;
