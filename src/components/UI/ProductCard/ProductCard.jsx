import { Link } from 'react-router';
import s from './ProductCard.module.scss';

function ProductCard({ id, imgUrl, title, price, sale }) {
	return (
		<li className={s.link}>
			<Link to={`/shop/product/${id}`}>
				<article>
					<img className={s.image} src={imgUrl} alt={title} />
					<h3 className={s.title}>{title}</h3>
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
