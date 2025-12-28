import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { fetchProduct, fetchProducts } from '../redux/products/products.action';
import {
	selectProduct,
	selectProducts,
	selectProductsStatus,
} from '../redux/products/products.select';

import ProductRelated from '../components/Product/ProductRelated/ProductRelated';
import PageTitleContent from '../components/shared/PageTitleContent';
import PageWrap from '../components/shared/PageWrap';
import ProductForm from '../components/ui/Forms/ProductForm';
import ProductSkeleton from '../components/ui/Skeletons/ProductSkeleton';
import { useAppDispatch } from '../redux/store';
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
