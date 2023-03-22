import { Outlet } from 'react-router-dom';
import HeaderComponent from '../../components/headerSection/Header.Component';

const CartShopPageComponent = () => {
	return (
		<>
			<HeaderComponent title='Cart With All Products' />
			<Outlet />
		</>
	);
};

export default CartShopPageComponent;
