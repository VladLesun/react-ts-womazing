import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
	PageTitleContent,
	PageWrap,
	ProductForm,
	ProductRelated,
	ProductSkeleton,
} from '../components';

import { useAppDispatch } from '../redux/redux.types';

import {
	fetchProduct,
	fetchProducts,
	selectProduct,
	selectProducts,
	selectProductsStatus,
} from '../redux';

import shuffle from '../util/shuffle';

const Product = () => {
	const dispatch = useAppDispatch();

	const product = useSelector(selectProduct);
	const products = useSelector(selectProducts);

	const productStatus = useSelector(selectProductsStatus);

	const { productId } = useParams<{ productId: string }>();

	const newProducts = useMemo(() => {
		if (!products || !product) return [];
		return products
			.filter(item => item.categoryId === product.categoryId)
			.filter(item => item.id !== productId);
	}, [products, product, productId]);

	const relatedProducts = useMemo(() => {
		return shuffle(newProducts).slice(0, 3);
	}, [newProducts]);

	useEffect(() => {
		if (productId) {
			dispatch(fetchProduct(productId));
		}
	}, [dispatch, productId]);

	useEffect(() => {
		if (product) {
			dispatch(fetchProducts({ id: product.categoryId }));
		}
	}, [dispatch, product]);

	let content = null;

	if (productStatus === 'loading') {
		content = <ProductSkeleton />;
	}

	if (productStatus === 'succeeded' && product) {
		content = (
			<>
				<PageTitleContent children={product.name} />

				<ProductForm {...product} />

				{newProducts.length > 0 && (
					<ProductRelated products={relatedProducts} />
				)}
			</>
		);
	}

	if (productStatus === 'failed') {
		content = (
			<>
				<PageTitleContent children='Товар не найден' />
				<Link to={'/shop'}>Вернуться назад</Link>
			</>
		);
	}

	return <PageWrap>{content}</PageWrap>;
};

export default Product;
