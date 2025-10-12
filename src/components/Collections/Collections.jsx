import Button from '../UI/Button/Button';
import ProductCard from '../UI/ProductCard/ProductCard';
import s from './Collections.module.scss';

function Collections() {
	const collectionItems = [
		{
			imgUrl: './img/collections/img1.png',
			title: 'Футболка USA',
			price: 229,
			sale: 129,
		},
		{
			imgUrl: './img/collections/img2.png',
			title: 'Купальник Glow',
			price: 129,
		},
		{
			imgUrl: './img/collections/img3.png',
			title: 'Свитшот Sweet Shot',
			price: 129,
		},
	];
	return (
		<section className={s.collections}>
			<div className='container'>
				<h2 className={s.title}>Новая коллекция</h2>

				<ul className={s.list}>
					{collectionItems.map(item => (
						<ProductCard
							key={item.title}
							imgUrl={item.imgUrl}
							title={item.title}
							price={item.price}
							sale={item?.sale}
						/>
					))}
				</ul>

				<Button
					children='Открыть магазин'
					href='/shop'
					variant='secondary'
					className={s.link}
				/>
			</div>
		</section>
	);
}

export default Collections;
