import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectUserId } from '../../../../redux/auth/auth.select';
import { clearCart } from '../../../../redux/cart/cart.action';
import {
	selectCartItems,
	selectCartStatus,
	selectTotalPrice,
} from '../../../../redux/cart/cart.select';
import { sendOrder } from '../../../../redux/order/order.action';

import { useValidation } from '../../../../hooks/useValidation';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import OrderSkeleton from '../../Skeletons/OrderSkeleton';
import s from './OrderForm.module.scss';

interface IOrderItem {
	productId: string;
	size: string;
	color: string;
	quantity: number;
	name: string;
	price: number;
}

type TOrder = {
	customer: any;
	products: IOrderItem[];
	totalPrice: number;
};

const OrderForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userId = useSelector(selectUserId);
	const cartItems: IOrderItem[] = useSelector(selectCartItems);
	console.log('cartItems: ', cartItems);
	const cartStatus = useSelector(selectCartStatus);
	const cartTotalPrice: number = useSelector(selectTotalPrice);

	const {
		values,
		errors,
		refs,
		validate,
		handleChange,
		handleReset,
		getCleanValues,
	} = useValidation(
		{
			name: '',
			email: '',
			phone: '',
			country: '',
			city: '',
			street: '',
			house: '',
			apartment: '',
			comment: '',
			payment: 'cash',
		},
		['name', 'email', 'phone', 'country', 'city', 'street', 'house']
	);

	const handleSendOrder = () => {
		if (!validate()) return;

		const order: TOrder = {
			customer: getCleanValues(),
			products: cartItems.map(item => ({
				productId: item.productId,
				name: item.name,
				size: item.size,
				color: item.color,
				price: item.price,
				quantity: item.quantity,
			})),
			totalPrice: cartTotalPrice,
		};

		dispatch(sendOrder({ userId, order }))
			.unwrap()
			.then(() => {
				dispatch(clearCart(userId));
				navigate('/confirmed');
				handleReset();
			})
			.catch(e => {
				console.log(e);
				alert('Ошибка при отправке заказа');
			});
	};

	return (
		<form className={s.form}>
			<div className={s.dataWrap}>
				<fieldset>
					<legend className={s.subtitle}>Данные покупателя</legend>
					<fieldset className={s.inputs}>
						<div>
							<Input
								ref={refs.name}
								className={cn(s.input, errors.name ? 'error' : '')}
								name='name'
								value={values.name}
								onChange={handleChange}
								type='text'
								placeholder='Имя'
							/>
							{errors.name && (
								<span className='error__text'>{errors.name}</span>
							)}
						</div>
						<div>
							<Input
								ref={refs.email}
								className={cn(s.input, errors.email ? 'error' : '')}
								name='email'
								value={values.email}
								onChange={handleChange}
								type='email'
								placeholder='E-mail'
							/>
							{errors.email && (
								<span className='error__text'>{errors.email}</span>
							)}
						</div>
						<div>
							<Input
								ref={refs.phone}
								className={cn(s.input, errors.phone ? 'error' : '')}
								name='phone'
								value={values.phone}
								onChange={handleChange}
								type='tel'
								placeholder='Телефон'
							/>
							{errors.phone && (
								<span className='error__text'>{errors.phone}</span>
							)}
						</div>
					</fieldset>
				</fieldset>

				<fieldset>
					<legend className={s.subtitle}>Адрес получателя</legend>
					<fieldset className={s.inputs}>
						<div>
							<Input
								ref={refs.country}
								className={cn(s.input, errors.country ? 'error' : '')}
								name='country'
								value={values.country}
								onChange={handleChange}
								type='text'
								placeholder='Страна'
							/>
							{errors.country && (
								<span className='error__text'>{errors.country}</span>
							)}
						</div>
						<div>
							<Input
								ref={refs.city}
								className={cn(s.input, errors.city ? 'error' : '')}
								name='city'
								value={values.city}
								onChange={handleChange}
								type='text'
								placeholder='Город'
							/>
							{errors.city && (
								<span className='error__text'>{errors.city}</span>
							)}
						</div>
						<div>
							<Input
								ref={refs.street}
								className={cn(s.input, errors.street ? 'error' : '')}
								name='street'
								value={values.street}
								onChange={handleChange}
								type='text'
								placeholder='Улица'
							/>
							{errors.street && (
								<span className='error__text'>{errors.street}</span>
							)}
						</div>
						<div>
							<Input
								ref={refs.house}
								className={cn(s.input, errors.house ? 'error' : '')}
								name='house'
								value={values.house}
								onChange={handleChange}
								type='number'
								placeholder='Дом'
							/>
							{errors.house && (
								<span className='error__text'>{errors.house}</span>
							)}
						</div>
						<Input
							className={s.input}
							name='apartment'
							value={values.apartment}
							onChange={handleChange}
							type='number'
							placeholder='Квартира'
						/>
					</fieldset>
				</fieldset>

				<fieldset>
					<legend className={s.subtitle}>Комментарии</legend>
					<fieldset className={s.inputs}>
						<Input
							className={s.input}
							name='comment'
							value={values.comment}
							onChange={handleChange}
							variant='textarea'
							placeholder='Ваш комментарий...'
						/>
					</fieldset>
				</fieldset>
			</div>
			<div className={s.orderWrap}>
				<div>
					<h2 className={s.subtitle}>Ваш заказ</h2>
					<ul className={s.list}>
						<li className={s.item}>
							Товар<span>Всего</span>
						</li>

						{cartStatus === 'loading' ? (
							<OrderSkeleton />
						) : (
							cartItems.map(item => (
								<li key={item.productId} className={cn(s.item, s.cartItem)}>
									<div className={s.itemContent}>
										<p>{item.name}</p>
										<p>
											<strong>Размер:</strong>{' '}
											<span className={s.size}>{item.size}</span>
										</p>
										<p>
											<strong>Цвет:</strong>{' '}
											<span
												className={s.color}
												style={{ backgroundColor: item.color }}
											></span>
										</p>
									</div>

									<p>${item.price * item.quantity}</p>
								</li>
							))
						)}
					</ul>

					<p className={s.totalOrder}>
						Итого: <span>${cartTotalPrice}</span>
					</p>
				</div>

				<fieldset className={s.payment}>
					<legend className={s.subtitle}>Способы оплаты</legend>

					<Input
						name='payment'
						value='cash'
						onChange={handleChange}
						checked={values.payment === 'cash'}
						type='radio'
						variant='payment'
						placeholder='Оплата наличными'
					/>

					<Input
						name='payment'
						value='card'
						onChange={handleChange}
						checked={values.payment === 'card'}
						type='radio'
						variant='payment'
						placeholder='Оплата картой'
					/>

					<Button onClick={handleSendOrder} children='Разместить заказ' />
				</fieldset>
			</div>
		</form>
	);
};

export default OrderForm;
