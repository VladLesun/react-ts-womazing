import PageTitleContent from '../components/shared/PageTitleContent';
import PageWrap from '../components/shared/PageWrap';
import OrderForm from '../components/ui/Forms/OrderForm';

const Order = () => {
	return (
		<PageWrap>
			<PageTitleContent children='Оформление заказа' />

			<OrderForm />
		</PageWrap>
	);
};

export default Order;
