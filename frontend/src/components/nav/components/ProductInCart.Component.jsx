import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai';
import { deleteFromCart } from '../../../redux/cart.slicer';
import { useNavigate } from 'react-router-dom';

const ProductInCartComponent = ({ product, index }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const shortTitle = () => {
		let shortTitleArr = product.title.split(' ');
		let newTitle = `${shortTitleArr[0]} ${shortTitleArr[1]}...`;
		return newTitle;
	};

	const handleDeletionFromCart = (e, id, index) => {
		e.stopPropagation();
		dispatch(deleteFromCart({ id, index }));
	};

	return (
		<div
			className='productInCart'
			onClick={()=>navigate('/productDetails/'+product._id)}>
			<div className="img-title-holder">
			<Link className='img-holder'  to='#' onClick={(e)=>handleDeletionFromCart(e, product._id)}>
				<div className="x-holder" title="Remove from cart">
					<AiOutlineClose />
				</div>
				<img src={product.imgUrl} alt={product.title} />
			</Link>
			<div className='title-holder'>{shortTitle()}</div>

			</div>
			<div className='count-price-holder'>
				<div className='count-holder'>{product.count} x</div>
				<div className='price-holder'>${product.price}</div>
			</div>

		</div>
	);
};

export default ProductInCartComponent;
