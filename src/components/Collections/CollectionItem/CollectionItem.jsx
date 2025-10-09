import s from './CollectionItem.module.scss';

function CollectionItem({ imgUrl, title, price, sale }) {
	return (
		<li>
			<a className={s.link} href='#!'>
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
			</a>
		</li>
	);
}

export default CollectionItem;
