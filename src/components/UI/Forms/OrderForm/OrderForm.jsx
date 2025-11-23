import cn from 'classnames';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	selectCartItems,
	selectCartStatus,
	selectTotalPrice,
} from '../../../../redux/cart/cart.select';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import s from './OrderForm.module.scss';

function OrderForm() {
	const navigate = useNavigate();

	const cartItems = useSelector(selectCartItems);
	const cartStatus = useSelector(selectCartStatus);
	const cartTotalPrice = useSelector(selectTotalPrice);

	const inputRefs = {
		name: useRef(null),
		email: useRef(null),
		phone: useRef(null),
		country: useRef(null),
		city: useRef(null),
		street: useRef(null),
		house: useRef(null),
		apartment: useRef(null),
		comment: useRef(null),
	};

	const [orderData, setOrderData] = useState({
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
	});
	const [errors, setErrors] = useState({});

	const handleSetOrderData = e => {
		const { name, value } = e.target;

		setOrderData(prev => ({
			...prev,
			[name]: value,
		}));

		// динамическая проверка поля
		let errorMsg = '';

		if (!value.trim()) {
			errorMsg = 'Поле обязательно';
		} else {
			if (name === 'email') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					errorMsg = 'Введите корректный email';
				}
			}
			if (name === 'phone') {
				const phoneRegex = /^[0-9+()\-\s]{7,}$/;
				if (!phoneRegex.test(value)) {
					errorMsg = 'Введите корректный номер телефона';
				}
			}
			if (
				!['house', 'apartment', 'email', 'phone'].includes(name) &&
				value.trim().length < 2
			) {
				errorMsg = 'Минимум 2 символа';
			}
		}

		setErrors(prev => ({
			...prev,
			[name]: errorMsg,
		}));
	};

	const validateForm = () => {
		const newErrors = {};
		const requiredFields = [
			'name',
			'email',
			'phone',
			'country',
			'city',
			'street',
			'house',
			'apartment',
		];

		requiredFields.forEach(field => {
			const value = orderData[field]?.trim();

			if (!value) {
				newErrors[field] = 'Поле обязательно';
				return;
			}

			if (field === 'email') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					newErrors[field] = 'Введите корректный email';
				}
			}

			if (field === 'phone') {
				const phoneRegex = /^[0-9+()\-\s]{7,}$/;
				if (!phoneRegex.test(value)) {
					newErrors[field] = 'Введите корректный номер телефона';
				}
			}

			if (
				!['house', 'apartment', 'email', 'phone'].includes(field) &&
				value.length < 2
			) {
				newErrors[field] = 'Минимум 2 символа';
			}
		});

		setErrors(newErrors);

		// если есть ошибки → скроллим к первому
		const firstErrorField = Object.keys(newErrors)[0];
		if (firstErrorField && inputRefs[firstErrorField]?.current) {
			inputRefs[firstErrorField].current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
			inputRefs[firstErrorField].current.focus();
		}

		return Object.keys(newErrors).length === 0;
	};

	const handleSendOrder = e => {
		e.preventDefault();

		if (!validateForm()) return;

		const order = {
			customer: orderData,
			products: cartItems.map(item => ({
				id: item.productId,
				size: item.size,
				color: item.color,
				quantity: item.quantity,
			})),
			totalPrice: cartTotalPrice,
		};

		console.log('order: ', order);

		navigate('/order/confirmed');
	};

	return (
		<form className={s.form}>
			<div className={s.dataWrap}>
				<fieldset>
					<legend className={s.subtitle}>Данные покупателя</legend>
					<fieldset className={s.inputs}>
						<div>
							<Input
								ref={inputRefs.name}
								className={cn(s.input, errors.name ? s.error : '')}
								name='name'
								value={orderData.name}
								onChange={handleSetOrderData}
								type='text'
								placeholder='Имя'
							/>
							{errors.name && (
								<span className={s.errorText}>{errors.name}</span>
							)}
						</div>
						<div>
							<Input
								ref={inputRefs.email}
								className={cn(s.input, errors.email ? s.error : '')}
								name='email'
								value={orderData.email}
								onChange={handleSetOrderData}
								type='email'
								placeholder='E-mail'
							/>
							{errors.email && (
								<span className={s.errorText}>{errors.email}</span>
							)}
						</div>
						<div>
							<Input
								ref={inputRefs.phone}
								className={cn(s.input, errors.phone ? s.error : '')}
								name='phone'
								value={orderData.phone}
								onChange={handleSetOrderData}
								type='phone'
								placeholder='Телефон'
							/>
							{errors.phone && (
								<span className={s.errorText}>{errors.phone}</span>
							)}
						</div>
					</fieldset>
				</fieldset>

				<fieldset>
					<legend className={s.subtitle}>Адрес получателя</legend>
					<fieldset className={s.inputs}>
						<div>
							<Input
								ref={inputRefs.country}
								className={cn(s.input, errors.country ? s.error : '')}
								name='country'
								value={orderData.country}
								onChange={handleSetOrderData}
								type='text'
								placeholder='Страна'
							/>
							{errors.country && (
								<span className={s.errorText}>{errors.country}</span>
							)}
						</div>
						<div>
							<Input
								ref={inputRefs.city}
								className={cn(s.input, errors.city ? s.error : '')}
								name='city'
								value={orderData.city}
								onChange={handleSetOrderData}
								type='text'
								placeholder='Город'
							/>
							{errors.city && (
								<span className={s.errorText}>{errors.city}</span>
							)}
						</div>
						<div>
							<Input
								ref={inputRefs.street}
								className={cn(s.input, errors.street ? s.error : '')}
								name='street'
								value={orderData.street}
								onChange={handleSetOrderData}
								type='text'
								placeholder='Улица'
							/>
							{errors.street && (
								<span className={s.errorText}>{errors.street}</span>
							)}
						</div>
						<div>
							<Input
								ref={inputRefs.house}
								className={cn(s.input, errors.house ? s.error : '')}
								name='house'
								value={orderData.house}
								onChange={handleSetOrderData}
								type='number'
								placeholder='Дом'
							/>
							{errors.house && (
								<span className={s.errorText}>{errors.house}</span>
							)}
						</div>
						<div>
							<Input
								ref={inputRefs.apartment}
								className={cn(s.input, errors.apartment ? s.error : '')}
								name='apartment'
								value={orderData.apartment}
								onChange={handleSetOrderData}
								type='number'
								placeholder='Квартира'
							/>
							{errors.apartment && (
								<span className={s.errorText}>{errors.apartment}</span>
							)}
						</div>
					</fieldset>
				</fieldset>

				<fieldset>
					<legend className={s.subtitle}>Комментарии</legend>
					<fieldset className={s.inputs}>
						<Input
							className={s.input}
							name='comment'
							value={orderData.comment}
							onChange={handleSetOrderData}
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

						{cartStatus === 'loading'
							? '<OrderSkeleton />'
							: cartItems.map(item => (
									<li key={item.id} className={cn(s.item, s.cartItem)}>
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
							  ))}
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
						onChange={handleSetOrderData}
						checked={orderData.payment === 'cash'}
						type='radio'
						variant='payment'
						placeholder='Оплата наличными'
					/>

					<Input
						name='payment'
						value='card'
						onChange={handleSetOrderData}
						checked={orderData.payment === 'card'}
						type='radio'
						variant='payment'
						placeholder='Оплата картой'
					/>

					<Button onClick={handleSendOrder} children='Разместить заказ' />
				</fieldset>
			</div>
		</form>
	);
}

export default OrderForm;
