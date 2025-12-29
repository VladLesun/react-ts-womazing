import { OrderForm, PageTitleContent, PageWrap } from '../components';

const Order = () => {
	return (
		<PageWrap>
			<PageTitleContent children='Оформление заказа' />

			<OrderForm />
		</PageWrap>
	);
};

export default Order;
