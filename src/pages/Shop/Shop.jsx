import { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import PageTitleContent from '../../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../../components/UI/PageWrap/PageWrap';
import ProductCard from '../../components/UI/ProductCard/ProductCard';
import ShopCountProducts from '../../components/UI/ShopCountProducts/ShopCountProducts';
import ShopPagination from '../../components/UI/ShopPagination/ShopPagination';
import s from './Shop.module.scss';

const categories = ['Все', 'Пальто', 'Свитшоты', 'Кардиганы', 'Толстовки'];
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

function Shop() {
	const [activeCategory, setActiveCategory] = useState(0);

	return (
		<PageWrap>
			<PageTitleContent children='Магазин' />

			<ul className={s.categories}>
				{categories?.map((category, index) => (
					<Button
						key={index}
						children={category}
						onClick={() => setActiveCategory(index)}
						className={activeCategory === index ? s._active : ''}
						variant='category'
					/>
				))}
			</ul>

			<div>
				<ShopCountProducts />

				<ul className={s.list}>
					<ProductCard
						imgUrl={collectionItems[0].imgUrl}
						title={collectionItems[0].title}
						price={collectionItems[0].price}
						sale={collectionItems[0]?.sale}
					/>
					<ProductCard
						imgUrl={collectionItems[1].imgUrl}
						title={collectionItems[1].title}
						price={collectionItems[1].price}
						sale={collectionItems[1]?.sale}
					/>
					<ProductCard
						imgUrl={collectionItems[2].imgUrl}
						title={collectionItems[2].title}
						price={collectionItems[2].price}
						sale={collectionItems[2]?.sale}
					/>
					<ProductCard
						imgUrl={collectionItems[0].imgUrl}
						title={collectionItems[0].title}
						price={collectionItems[0].price}
						sale={collectionItems[0]?.sale}
					/>
					<ProductCard
						imgUrl={collectionItems[1].imgUrl}
						title={collectionItems[1].title}
						price={collectionItems[1].price}
						sale={collectionItems[1]?.sale}
					/>
					<ProductCard
						imgUrl={collectionItems[2].imgUrl}
						title={collectionItems[2].title}
						price={collectionItems[2].price}
						sale={collectionItems[2]?.sale}
					/>
					<ProductCard
						imgUrl={collectionItems[0].imgUrl}
						title={collectionItems[0].title}
						price={collectionItems[0].price}
						sale={collectionItems[0]?.sale}
					/>
					<ProductCard
						imgUrl={collectionItems[1].imgUrl}
						title={collectionItems[1].title}
						price={collectionItems[1].price}
						sale={collectionItems[1]?.sale}
					/>
					<ProductCard
						imgUrl={collectionItems[2].imgUrl}
						title={collectionItems[2].title}
						price={collectionItems[2].price}
						sale={collectionItems[2]?.sale}
					/>
				</ul>

				<ShopCountProducts />

				<ShopPagination className={s._active} />
			</div>
		</PageWrap>
	);
}

export default Shop;
