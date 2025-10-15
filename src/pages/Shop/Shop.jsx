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

function Shop({ collectionItems }) {
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
					{collectionItems?.map(product => (
						<ProductCard
							key={product.id}
							id={product.id}
							imgUrl={product.imgUrl}
							title={product.title}
							price={product.price}
							sale={product?.sale}
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
