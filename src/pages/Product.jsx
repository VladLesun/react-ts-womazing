import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProductRelated from '../components/Product/ProductRelated/ProductRelated';
import ProductForm from '../components/UI/Forms/ProductForm/ProductForm';
import PageTitleContent from '../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../components/UI/PageWrap/PageWrap';
import ProductSkeleton from '../components/UI/Skeletons/ProductSkeleton/ProductSkeleton';
import { fetchProduct, fetchProducts } from '../redux/products/products.action';
import {
	selectProduct,
	selectProducts,
	selectProductsStatus,
} from '../redux/products/products.select';
import shuffle from '../util/shuffle';

function Product() {
	const dispatch = useDispatch();

	const product = useSelector(selectProduct);
	const products = useSelector(selectProducts);

	const productStatus = useSelector(selectProductsStatus);
	console.log('productStatus: ', productStatus);

	const { productId } = useParams();

	const newProducts = () => {
		if (!products) return [];

		const categoryProducts = products.filter(
			item => item.categoryId === product?.categoryId
		);

		const searchProducts = categoryProducts.filter(
			item => item.id !== productId
		);

		return searchProducts;
	};

	const relatedProducts = useMemo(() => {
		return shuffle(newProducts()).slice(0, 3);
	}, [products]);

	useEffect(() => {
		dispatch(fetchProduct(productId));
	}, [dispatch, productId]);

	useEffect(() => {
		if (product) {
			dispatch(fetchProducts(product.categoryId));
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

				{newProducts().length > 0 && (
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
}

export default Product;
