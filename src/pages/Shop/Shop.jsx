import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/Product/ProductCard/ProductCard';
import ProductCategory from '../../components/Product/ProductCategory/ProductCategory';
import PageTitleContent from '../../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../../components/UI/PageWrap/PageWrap';
import ShopCountProducts from '../../components/UI/ShopCountProducts/ShopCountProducts';
import ShopPagination from '../../components/UI/ShopPagination/ShopPagination';
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

	const buildParams = () => {
		const params = {};

		if (categoryObj.id && categoryObj.id !== 'all') {
			params.category = categoryObj.id;
		}

		return params;
	};

	const getProducts = () => {
		dispatch(fetchProducts(categoryObj));
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

			dispatch(
				setFilters({
					category,
				})
			);
		}
	}, [dispatch, searchParams, categoriesArray]);

	useEffect(() => {
		getProducts();

		// window.scrollTo(0, 0);
	}, [categoryObj]);

	let content = null;

	if (productsStatus === 'loading') {
		content = <ProductsSkeleton count={6} />;
	}

	if (productsStatus === 'succeeded' && products.length) {
		content = products?.map(product => (
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
			<li>
				Товары в этом разделе скоро появятся, извините за временные неудобства
			</li>
		);
	}

	if (productsStatus === 'failed') {
		content = <li>Произошла ошибка подключения товаров</li>;
	}

	return (
		<PageWrap>
			<PageTitleContent children='Магазин' />

			<ProductCategory />

			<div>
				{products.length !== 0 && (
					<ShopCountProducts productLength={products.length} />
				)}

				<ul className={s.list}>{content}</ul>

				{products.length !== 0 && (
					<ShopCountProducts productLength={products.length} />
				)}

				{products.length >= 12 && <ShopPagination className={s._active} />}
			</div>
		</PageWrap>
	);
}

export default Shop;
