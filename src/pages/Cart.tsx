import PageTitleContent from '../components/shared/PageTitleContent';
import PageWrap from '../components/shared/PageWrap';
import CartForm from '../components/ui/Forms/CartForm';

const Cart = () => {
	return (
		<PageWrap>
			<PageTitleContent children='Корзина' />

			<CartForm />
		</PageWrap>
	);
};

export default Cart;
