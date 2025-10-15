import Button from '../../Button/Button';
import Input from '../../Input/Input';
import s from './ProductForm.module.scss';

function ProductForm({ onClick, imgUrl, title, price, sale, size, color }) {
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
						{size.map(size => (
							<li key={size}>
								<Input type='radio' variant='size' value={size} />
							</li>
						))}
					</ul>
				</div>

				<div className={s.wrap}>
					<p className={s.subtitle}>Выберите цвет</p>
					<ul className={s.list}>
						{color.map(color => (
							<li key={color}>
								<Input type='radio' variant='color' value={color} />
							</li>
						))}
					</ul>
				</div>

				<div className={s.actions}>
					<Input type='number' variant='count' value={1} />
					<Button onClick={onClick} children='Добавить в корзину' />
				</div>
			</div>
		</form>
	);
}

export default ProductForm;
