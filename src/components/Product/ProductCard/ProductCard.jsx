import { Link } from 'react-router-dom';
import s from './ProductCard.module.scss';

function ProductCard({ id, imgUrl, name, price, sale }) {
	return (
		<li className={s.link}>
			<Link to={`/shop/product/${id}`}>
				<article>
					<img className={s.image} src={imgUrl} alt={name} />
					<h3 className={s.name}>{name}</h3>
					{sale ? (
						<p className={s.price}>
							<span className={s.sale}>${price}</span>${sale}
						</p>
					) : (
						<p className={s.price}>${price}</p>
					)}
				</article>
			</Link>
		</li>
	);
}

export default ProductCard;
