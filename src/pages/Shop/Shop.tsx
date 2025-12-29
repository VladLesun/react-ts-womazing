import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
	selectCategoriesArray,
	selectCategory,
} from '../../redux/filter/filter.select';
import { setCategory } from '../../redux/filter/filter.slice';
import { fetchProducts } from '../../redux/products/products.action';
import {
	selectProducts,
	selectProductsStatus,
} from '../../redux/products/products.select';

import {
	PageTitleContent,
	PageWrap,
	ProductCard,
	ProductCategory,
	ProductsSkeleton,
} from '../../components';

import { useAppDispatch } from '../../redux/redux.types';
import s from './Shop.module.scss';

const Shop = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const dispatch = useAppDispatch();

	const products = useSelector(selectProducts);
	const productsStatus = useSelector(selectProductsStatus);

	const categoryObj = useSelector(selectCategory);
	const categoriesArray = useSelector(selectCategoriesArray);

	const [visibleCount, setVisibleCount] = useState(6);
	const [countStep, setCountStep] = useState(6);
	const loaderRef = useRef<HTMLDivElement | null>(null);

	const buildParams = useCallback(
		(): Record<'category', string> => ({
			category:
				categoryObj.id && categoryObj.id !== 'all' ? categoryObj.id : 'all',
		}),
		[categoryObj.id]
	);

	useEffect(() => {
		const queryString = new URLSearchParams(buildParams()).toString();

		if (window.location.search !== `?${queryString}`) {
			navigate(`?${queryString}`);
		}
	}, [buildParams, navigate]);

	useEffect(() => {
		if (searchParams.size) {
			const params = Object.fromEntries(searchParams.entries());
			const category =
				categoriesArray.find(category => category.id === params.category) ||
				categoriesArray[0];

			dispatch(setCategory(category));
		}
	}, [dispatch, searchParams, categoriesArray]);

	useEffect(() => {
		dispatch(fetchProducts(categoryObj));
	}, [dispatch, categoryObj]);

	useEffect(() => {
		const handleCountOnResize = () => {
			if (window.innerWidth >= 761) {
				setVisibleCount(6); // планшет
				setCountStep(6);
			} else if (window.innerWidth >= 461) {
				setVisibleCount(4); // мобильный-lg
				setCountStep(4);
			} else {
				setVisibleCount(2); // маленький мобильный
				setCountStep(2);
			}
		};

		handleCountOnResize();

		window.addEventListener('resize', handleCountOnResize);

		return () => window.removeEventListener('resize', handleCountOnResize);
	}, []);

	useEffect(() => {
		const loader = loaderRef.current;

		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && productsStatus !== 'loading') {
				setVisibleCount(prev => prev + countStep);
			}
		});

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loader) {
				observer.unobserve(loader);
			}
			observer.disconnect();
		};
	}, [productsStatus, countStep]);

	let content = null;

	if (productsStatus === 'loading') {
		content = <ProductsSkeleton count={visibleCount} />;
	}

	if (productsStatus === 'succeeded' && products.length) {
		content = products
			.slice(0, visibleCount)
			.map(product => (
				<ProductCard
					key={product.id}
					id={product.id}
					imgUrl={product.imgUrl}
					name={product.name}
					price={product.price}
					sale={product?.sale}
				/>
			));
	}

	if (productsStatus === 'succeeded' && !products.length) {
		content = (
			<li className={s.content}>
				Товары в этом разделе скоро появятся, извините за временные неудобства
			</li>
		);
	}

	if (productsStatus === 'failed') {
		content = (
			<li className={s.content}>Произошла ошибка подключения товаров</li>
		);
	}

	return (
		<PageWrap>
			<PageTitleContent children='Магазин' />

			<ProductCategory setVisibleCount={setVisibleCount} />

			<ul className={s.list}>{content}</ul>

			<div ref={loaderRef}>
				{productsStatus === 'loading' && (
					<ProductsSkeleton count={visibleCount} />
				)}
			</div>
		</PageWrap>
	);
};

export default Shop;
