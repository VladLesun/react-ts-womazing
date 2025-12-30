import { forwardRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Button, ProductCard, ProductsSkeleton } from '../../../components';
import { fetchProducts, selectProducts } from '../../../redux';
import { useAppDispatch } from '../../../redux/redux.types';
import shuffle from '../../../util/shuffle';

import s from './Collections.module.scss';

const Collections = forwardRef<HTMLElement, object>((_, ref) => {
	const dispatch = useAppDispatch();

	const products = useSelector(selectProducts);

	const newCollectionProducts = useMemo(() => {
		if (!products) return [];
		return shuffle(products).slice(0, 3);
	}, [products]);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<section className={s.collections} ref={ref}>
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
});

export default Collections;
