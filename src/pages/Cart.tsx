import { CartForm, PageTitleContent, PageWrap } from '../components';

const Cart = () => {
	return (
		<PageWrap>
			<PageTitleContent children='Корзина' />

			<CartForm />
		</PageWrap>
	);
};

export default Cart;
