import { useState } from 'react';
import { Outlet } from 'react-router';
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
		id: 1,
		imgUrl: './img/collections/img1.png',
		title: 'Футболка USA',
		price: 229,
		sale: 129,
	},
	{
		id: 2,
		imgUrl: './img/collections/img2.png',
		title: 'Купальник Glow',
		price: 129,
	},
	{
		id: 3,
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
					{collectionItems?.map(item => (
						<ProductCard
							key={item.id}
							id={item.id}
							imgUrl={item.imgUrl}
							title={item.title}
							price={item.price}
							sale={item?.sale}
						/>
					))}
				</ul>

				<ShopCountProducts />

				<ShopPagination className={s._active} />
			</div>

			<Outlet />
		</PageWrap>
	);
}

export default Shop;
