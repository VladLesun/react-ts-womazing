import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { db } from '../../API/fireBase';
import Button from '../../components/UI/Button/Button';
import PageTitleContent from '../../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../../components/UI/PageWrap/PageWrap';
import ProductCard from '../../components/UI/ProductCard/ProductCard';
import ShopCountProducts from '../../components/UI/ShopCountProducts/ShopCountProducts';
import ShopPagination from '../../components/UI/ShopPagination/ShopPagination';
import s from './Shop.module.scss';

// const categories = ['Все', 'Пальто', 'Свитшоты', 'Кардиганы', 'Толстовки'];

function Shop({ collectionProducts }) {
	const [categories, setCategories] = useState(null);
	const [activeCategory, setActiveCategory] = useState('all');

	useEffect(() => {
		(async () => {
			const qCategories = query(collection(db, 'categories'));
			const snapshot = await getDocs(qCategories);

			const categories = snapshot.docs.map(doc => ({
				id: doc.id,
				name: doc.data().name,
			}));

			setCategories(categories);
		})();
	}, []);

	

	return (
		<PageWrap>
			<PageTitleContent children='Магазин' />

			<ul className={s.categories}>
				{categories?.map(category => (
					<Button
						key={category.id}
						children={category.name}
						onClick={() => setActiveCategory(category.id)}
						className={activeCategory === category.id ? s._active : ''}
						variant='category'
					/>
				))}
			</ul>

			<div>
				<ShopCountProducts />

				<ul className={s.list}>
					{collectionProducts?.map(product => (
						<ProductCard
							key={product.id}
							id={product.id}
							imgUrl={product.imgUrl}
							name={product.name}
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
