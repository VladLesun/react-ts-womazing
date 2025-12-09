import CartForm from '../components/UI/Forms/CartForm/CartForm';
import PageTitleContent from '../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../components/UI/PageWrap/PageWrap';

const Cart = () => {
	return (
		<PageWrap>
			<PageTitleContent children='Корзина' />

			<CartForm />
		</PageWrap>
	);
};

export default Cart;
