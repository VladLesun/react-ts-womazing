import cn from 'classnames';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../../../redux/auth/auth.select';
import {
	removeFromCart,
	updateCartItemQuantity,
} from '../../../redux/cart/cart.action';
import { debounce } from '../../../util/debounce';
import Input from '../../UI/Input/Input';
import s from './ProductCart.module.scss';

function ProductCart({
	id,
	productId,
	imgUrl,
	name,
	size,
	color,
	price,
	quantity,
}) {
	const dispatch = useDispatch();

	const userId = useSelector(selectUserId);

	const [productQuantity, setProductQuantity] = useState(quantity);

	const updateProductQuantity = useCallback(
		debounce(str => {
			dispatch(updateCartItemQuantity({ userId, id, quantity: str }));
		}, 1000),
		[dispatch, userId, id]
	);

	const handleUpdateQuantity = e => {
		const val = e.target.value === '' ? '' : Number(e.target.value);
		setProductQuantity(val);
		if (val !== '') {
			updateProductQuantity(val);
		}
	};

	const handleItemRemove = () => {
		if (confirm('Ты действительно хочешь удалить товар из корзины ?')) {
			dispatch(removeFromCart({ userId, id }));
		}
	};

	return (
		<tr className={s.body}>
			<td className={cn(s.td, s.td_first)}>
				<button onClick={handleItemRemove} className={s.remove} type='button'>
					<svg
						width='14'
						height='14'
						viewBox='0 0 14 14'
						stroke='currentColor'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M1 1L13 13M13 1L1 13' />
					</svg>
				</button>

				<img className={s.image} src={imgUrl} alt={name} />

				<div className={s.desc}>
					<p>{name}</p>
					<p>
						Размер:
						<span className={s.size}>{size}</span>
					</p>
					<p>
						Цвет:
						<span className={s.color} style={{ backgroundColor: color }}></span>
					</p>
				</div>
			</td>
			<td className={s.td}>
				<p>$ {price}</p>
			</td>
			<td className={s.td}>
				<Input
					variant='count'
					type='number'
					value={productQuantity}
					onChange={handleUpdateQuantity}
				/>
			</td>
			<td className={s.td}>
				<p>${quantity * price}</p>
			</td>
		</tr>
	);
}

export default ProductCart;
