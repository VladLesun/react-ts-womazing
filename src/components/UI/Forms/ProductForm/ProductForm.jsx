import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../../redux/auth/auth.select';
import { addToCart } from '../../../../redux/cart/cart.action';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import s from './ProductForm.module.scss';

function ProductForm({ id, imgUrl, name, price, sale, size, color }) {
	const dispatch = useDispatch();

	const userId = useSelector(selectUserId);

	const [itemSize, setItemSize] = useState(size[0]);
	const [itemColor, setItemColor] = useState(color[0]);
	const [itemQuantity, setItemQuantity] = useState(1);

	const handleAddProduct = e => {
		e.preventDefault();

		if (!userId) {
			console.warn('Нет userId — пользователь не авторизован');
			return;
		}
		if (!itemSize || !itemColor || itemQuantity < 1) {
			console.warn('Некорректные данные товара');
			return;
		}

		const item = {
			productId: id,
			imgUrl,
			name,
			size: itemSize,
			color: itemColor,
			price: sale ? sale : price,
			quantity: itemQuantity,
		};

		dispatch(addToCart({ userId, item }));

		alert(`Вещь (${name}) успешно добавлена в козину`);
	};

	return (
		<form className={s.form}>
			<img className={s.image} src={imgUrl} alt={name} />
			<div className={s.content}>
				{sale ? (
					<p className={s.price}>
						${sale}
						<span className={s.sale}>${price}</span>
					</p>
				) : (
					<p className={s.price}>${price}</p>
				)}

				<div className={s.wrap}>
					<p className={s.subtitle}>Выберите размер</p>
					<ul className={s.list}>
						{size?.map(item => (
							<li key={item}>
								<Input
									type='radio'
									variant='size'
									value={item}
									checked={itemSize === item}
									onChange={() => setItemSize(item)}
								/>
							</li>
						))}
					</ul>
				</div>

				<div className={s.wrap}>
					<p className={s.subtitle}>Выберите цвет</p>
					<ul className={s.list}>
						{color?.map(item => (
							<li key={item}>
								<Input
									type='radio'
									variant='color'
									value={item}
									checked={itemColor === item}
									onChange={() => setItemColor(item)}
								/>
							</li>
						))}
					</ul>
				</div>

				<div className={s.actions}>
					<Input
						type='number'
						variant='count'
						value={itemQuantity}
						onChange={e => {
							const val = e.target.value;
							setItemQuantity(val === '' ? '' : Number(val));
						}}
					/>
					<Button onClick={handleAddProduct} children='Добавить в корзину' />
				</div>
			</div>
		</form>
	);
}

export default ProductForm;
