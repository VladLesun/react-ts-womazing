import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import { db } from '../../API/firebase.js';
import ProductCard from '../../components/Product/ProductCard/ProductCard';
import ProductCategory from '../../components/Product/ProductCategory/ProductCategory';
import PageTitleContent from '../../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../../components/UI/PageWrap/PageWrap';
import ShopCountProducts from '../../components/UI/ShopCountProducts/ShopCountProducts';
import ShopPagination from '../../components/UI/ShopPagination/ShopPagination';
import ProductsSkeleton from '../../components/UI/Skeletons/ProductsSkeleton/ProductsSkeleton';
import { useProducts } from '../../context/ProductsContext';
import {
	selectCategoriesArray,
	selectCategory,
} from '../../redux/filter/filter.select';
import { setFilters } from '../../redux/filter/filter.slice';
import s from './Shop.module.scss';

function Shop() {
	const dispatch = useDispatch();

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const categoryObj = useSelector(selectCategory);
	const categoriesArray = useSelector(selectCategoriesArray);

	const [isLoading, setIsLoading] = useState(true);
	const { products, setProducts } = useProducts();

	const buildParams = () => {
		const params = {};

		if (categoryObj.id && categoryObj.id !== 'all') {
			params.category = categoryObj.id;
		}

		return params;
	};

	const fetchProducts = async () => {
		setIsLoading(true);
		//
		try {
			let qProducts;

			if (categoryObj.id && categoryObj.id !== 'all') {
				qProducts = query(
					collection(db, 'products'),
					where('categoryId', '==', categoryObj.id)
				);
			} else {
				qProducts = query(collection(db, 'products'));
			}

			const snapshot = await getDocs(qProducts);

			const products = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));

			setProducts(products);
		} catch (error) {
			console.error('Ошибка получения данных...', error);
			setIsError(error);
		} finally {
			setIsLoading(false);
		}
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
		window.scrollTo(0, 0);

		fetchProducts();
	}, [categoryObj]);

	return (
		<PageWrap>
			<PageTitleContent children='Магазин' />

			<ProductCategory />

			<div>
				{products.length !== 0 && (
					<ShopCountProducts productLength={products.length} />
				)}

				<ul className={s.list}>
					{isLoading ? (
						<ProductsSkeleton count={6} />
					) : products.length === 0 ? (
						<li>
							Товары в этом разделе скоро появятся, извините за временные
							неудобства
						</li>
					) : (
						products?.map(product => (
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

				{products.length !== 0 && (
					<ShopCountProducts productLength={products.length} />
				)}

				{products.length >= 12 && <ShopPagination className={s._active} />}
			</div>
		</PageWrap>
	);
}

export default Shop;
