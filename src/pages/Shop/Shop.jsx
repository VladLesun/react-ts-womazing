import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/Product/ProductCard/ProductCard';
import ProductCategory from '../../components/Product/ProductCategory/ProductCategory';
import PageTitleContent from '../../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../../components/UI/PageWrap/PageWrap';
import ProductsSkeleton from '../../components/UI/Skeletons/ProductsSkeleton/ProductsSkeleton';
import {
	selectCategoriesArray,
	selectCategory,
} from '../../redux/filter/filter.select';
import { setFilters } from '../../redux/filter/filter.slice';
import { fetchProducts } from '../../redux/products/products.action';
import {
	selectProducts,
	selectProductsStatus,
} from '../../redux/products/products.select';
import s from './Shop.module.scss';

function Shop() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const dispatch = useDispatch();

	const products = useSelector(selectProducts);
	const productsStatus = useSelector(selectProductsStatus);

	const categoryObj = useSelector(selectCategory);
	const categoriesArray = useSelector(selectCategoriesArray);

	const [visibleCount, setVisibleCount] = useState(6);
	const [countStep, setCountStep] = useState(6);
	const loaderRef = useRef(null);

	const buildParams = () => {
		const params = {};

		if (categoryObj.id && categoryObj.id !== 'all') {
			params.category = categoryObj.id;
		}

		return params;
	};

	useEffect(() => {
		const queryString = new URLSearchParams(buildParams()).toString();

		if (window.location.search !== `?${queryString}`) {
			navigate(`?${queryString}`);
		}
	}, [categoryObj]);

	useEffect(() => {
		if (searchParams.size) {
			const params = Object.fromEntries(searchParams.entries());
			const category =
				categoriesArray.find(category => category.id === params.category) ||
				categoriesArray[0];

			dispatch(setFilters(category));
		}
	}, [dispatch, searchParams, categoriesArray]);

	useEffect(() => {
		dispatch(fetchProducts(categoryObj));
	}, [categoryObj]);

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
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && productsStatus !== 'loading') {
				setVisibleCount(prev => prev + countStep);
			}
		});

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
			observer.disconnect();
		};
	}, [productsStatus]);

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
}

export default Shop;
