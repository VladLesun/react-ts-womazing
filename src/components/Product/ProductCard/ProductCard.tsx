import { Link } from 'react-router-dom';

import s from './ProductCard.module.scss';

type TProductCardProps = {
	id: string;
	imgUrl: string;
	name: string;
	price: number;
	sale: number;
};

const ProductCard = ({ id, imgUrl, name, price, sale }: TProductCardProps) => {
	return (
		<li>
			<Link className={s.link} to={`/shop/${id}`}>
				<article>
					<div className={s.imageWrap} style={{}}>
						<img className={s.image} src={imgUrl} alt={name} />
					</div>
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
};

export default ProductCard;
