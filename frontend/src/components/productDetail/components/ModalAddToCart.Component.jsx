import { HiShoppingCart,HiCheck,HiOutlineX } from 'react-icons/hi';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const ModalAddToCartComponent = ({handleAddToCart,singleProduct,count})=>{

	const totalCountCart = useSelector((state) => state.cartStore.totalCount);
	const totalPrice = useSelector((state) => state.cartStore.totalPrice);

	return(
                 <>
                        <button
							className='addToCart'
							onClick={() => handleAddToCart()} type='button' data-bs-toggle="modal" data-bs-target="#cartModal">
							
							<HiShoppingCart />
							
							add to cart
						</button>
						<div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
  							<div className=" modal-dialog modal-dialog-centered modal-xl">
    							<div className="modal-content custom-modalCart-content">
      								<div className="modal-header custom-modalCart-header">
										<div className="wrapper-cartModal-header">
										<HiCheck className='checkMark' />
        								<h2 className="modal-title fs-5" id="cartModalLabel">Product successfully added to your shopping cart</h2>
        								<button type="button" className="custom-btnClose border border-0" data-bs-dismiss="modal" aria-label="Close">
											<HiOutlineX className='x-btn' />
										</button>
										</div>
										
      								</div>
      								<div className="modal-body">
        								<div className="row">
											<div className="col-lg-6 pe-0">
												<div className="leftHolder">
												<div className="row">
													<div className="col-lg-6">
														<div className="modal-cart-imgHolder">
															<img src={singleProduct.imgUrl} alt={singleProduct.title} />
														</div>
													</div>
													<div className="col-lg-6 ps-4">
														<h3 className='mb-4 fs-4'>{singleProduct.title}</h3>
														<p><span className='fw-bold'>Price: </span>${singleProduct.price}</p>
														<p><span className='fw-bold'>Quantity: </span>{count}</p>
													</div>
												</div>
												</div>
												
											</div>

											<div className="col-lg-6 ps-0">
												<div className="rightHolder">
												<h3 className='fs-5 fw-normal mb-4'>There {totalCountCart>1 ? 'are' : 'is'} {totalCountCart} item{totalCountCart>1 ? 's' : null} in your cart. </h3>
												<p><span className='fw-bold'>Total products: </span>${totalPrice}</p>
												<p><span className='fw-bold'>Total shipping: </span>$0.00</p>
												<p><span className='fw-bold'>Taxes: </span>$0.00</p>
												<p><span className='fw-bold'>Total: </span>${totalPrice} (tax excl.)</p>
												<button type="button" className="me-3 modal-continueBtn" data-bs-dismiss="modal">Continue Shopping</button>
												<button type="button" className="modal-checkoutBtn" data-bs-dismiss="modal">
													<Link to='/cartshop/checkout' className='modal-checkoutLink'>Proceed To Checkout</Link>
												</button>
        										
												</div>
												
											</div>
										</div>
      								</div>
    							</div>
  							</div>
						</div>
                </>
	)
}

export default ModalAddToCartComponent;