import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUserId } from '../../../../redux/auth/auth.select';
import { fetchCart } from '../../../../redux/cart/cart.action';
import {
	selectCartItems,
	selectCartStatus,
	selectTotalPrice,
} from '../../../../redux/cart/cart.select';

import { useAppDispatch } from '../../../../redux/store';

import CartEmpty from '../../../CartEmpty/CartEmpty';
import ProductCart from '../../../Product/ProductCart/ProductCart';
import Button from '../../Button/Button';
import CartSkeleton from '../../Skeletons/CartSkeleton/CartSkeleton';
import s from './CartForm.module.scss';

const CartForm = () => {
	const dispatch = useAppDispatch();

	const userId = useSelector(selectUserId);
	const cartItems = useSelector(selectCartItems);
	const cartTotalPrice = useSelector(selectTotalPrice);
	const cartStatus = useSelector(selectCartStatus);

	useEffect(() => {
		if (userId) {
			dispatch(fetchCart(userId));
		}
	}, [dispatch, userId]);

	let content = null;

	if (cartStatus === 'loading') {
		content = <CartSkeleton />;
	}

	if (cartStatus === 'succeeded' && cartItems.length) {
		content = cartItems.map(item => <ProductCart key={item.id} {...item} />);
	}

	if (cartStatus === 'succeeded' && !cartTotalPrice) {
		return <CartEmpty />;
	}

	if (cartStatus === 'failed') {
		content = (
			<tr>
				<td colSpan={4} className={s.errorMessage}>
					Произошла ошибка, попробуйте позже
				</td>
			</tr>
		);
	}

	return (
		<form className={s.form}>
			<div className={s.tableMobile}>
				<table className={s.table}>
					<thead>
						<tr className={s.head}>
							<th className={s.th}>Товар</th>
							<th className={s.th}>Цена</th>
							<th className={s.th}>Количество</th>
							<th className={s.th}>Всего</th>
						</tr>
					</thead>
					<tbody>{content}</tbody>
				</table>
			</div>

			{/* <div className={s.promoWrap}>
				<div className={s.promo}>
					<Input type='text' placeholder='Введите купон' />
					<Button children='Применить купон' variant='secondary' />
				</div>

				<Button children='Обновить корзину' variant='secondary' />
			</div> */}

			<div className={s.order}>
				<p className={s.total}>
					Итого: <span className={s.totalPrice}>${cartTotalPrice}</span>
				</p>

				<Button href={'/order'} children='Оформить заказ' />
			</div>
		</form>
	);
};

export default CartForm;
