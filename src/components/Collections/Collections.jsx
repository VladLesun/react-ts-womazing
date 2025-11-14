import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../../redux/products/products.action';
import { selectProducts } from '../../redux/products/products.select';
import shuffle from '../../util/shuffle';
import ProductCard from '../Product/ProductCard/ProductCard';
import Button from '../UI/Button/Button';
import ProductsSkeleton from '../UI/Skeletons/ProductsSkeleton/ProductsSkeleton';
import s from './Collections.module.scss';

function Collections() {
	const dispatch = useDispatch();

	const products = useSelector(selectProducts);

	const newCollectionProducts = useMemo(() => {
		if (!products) return [];
		return shuffle(products).slice(0, 3);
	}, [products]);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<section className={s.collections}>
			<div className='container'>
				<h2 className={s.title}>Новая коллекция</h2>

				<ul className={s.list}>
					{!products ? (
						<ProductsSkeleton count={3} />
					) : (
						newCollectionProducts.map(product => (
							<ProductCard
								key={product.id}
								id={product.id}
								imgUrl={product.imgUrl}
								name={product.name}
								price={product.price}
								sale={product?.sale}
							/>
						))
					)}
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
