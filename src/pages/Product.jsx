import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProductRelated from '../components/Product/ProductRelated/ProductRelated';
import ProductForm from '../components/UI/Forms/ProductForm/ProductForm';
import PageTitleContent from '../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../components/UI/PageWrap/PageWrap';
import { fetchProduct, fetchProducts } from '../redux/products/products.action';
import {
	selectProduct,
	selectProducts,
	selectProductsStatus,
} from '../redux/products/products.select';

function Product() {
	const dispatch = useDispatch();

	const product = useSelector(selectProduct);
	const products = useSelector(selectProducts);
	const productStatus = useSelector(selectProductsStatus);

	const { productId } = useParams();

	useEffect(() => {
		dispatch(fetchProduct(productId));
	}, [dispatch]);

	useEffect(() => {
		if (product) {
			dispatch(fetchProducts(product.categoryId));
		}
	}, [dispatch, product]);

	let content = null;

	if (productStatus === 'loading') {
		content = 'Загрузка....';
	}

	if (productStatus === 'succeeded' && product) {
		const categoryProducts = products?.filter(
			item => item.categoryId === product.categoryId
		);

		const productRelated = categoryProducts?.filter(
			item => item.id !== productId
		);

		content = (
			<>
				<PageTitleContent children={product.name} />

				<ProductForm
					{...product}
					onClick={e => {
						e.preventDefault();
						console.log('Продукт добавлен в корзину');
					}}
				/>

				{productRelated.length > 0 && (
					<ProductRelated products={productRelated} />
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
