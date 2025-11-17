import { useState } from 'react';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import s from './ProductForm.module.scss';

function ProductForm({ onClick, id, imgUrl, title, price, sale, size, color }) {
	const [itemSize, setItemSize] = useState(size[0]);
	const [itemColor, setItemColor] = useState(color[0]);
	const [itemQuantity, setItemQuantity] = useState(1);

	const handleAddProduct = e => {
		e.preventDefault();
		// if() {}
		const item = {
			imgUrl,
			title,
			size: itemSize,
			color: itemColor,
			price: sale ? sale : price,
			quantity: itemQuantity,
		};
		console.log(`Товар успешно добавлен в корзину!`, item);
	};

	return (
		<form className={s.form}>
			<img className={s.image} src={imgUrl} alt={title} />
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
