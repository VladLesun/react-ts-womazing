import OrderForm from '../components/UI/Forms/OrderForm/OrderForm';
import PageTitleContent from '../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../components/UI/PageWrap/PageWrap';

const Order = () => {
	return (
		<PageWrap>
			<PageTitleContent children='Оформление заказа' />

			<OrderForm />
		</PageWrap>
	);
};

export default Order;
