import { useParams } from 'react-router';
import ProductRelated from '../components/Product/ProductRelated/ProductRelated';
import ProductForm from '../components/UI/Forms/ProductForm/ProductForm';
import PageTitleContent from '../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../components/UI/PageWrap/PageWrap';
import { useProducts } from '../context/ProductsContext';

function Product() {
	const { products } = useProducts();
	const { id } = useParams();
	const product = products?.find(item => item.id === id);
	const productRelated = products?.filter(item => item.id !== id);

	if (!product) {
		return (
			<PageWrap>
				<PageTitleContent children='Товар не найден' />
			</PageWrap>
		);
	}

	return (
		<PageWrap>
			<PageTitleContent children={product.name} />

			<ProductForm
				{...product}
				onClick={e => {
					e.preventDefault();
					console.log('Продукт добавлен в корзину');
				}}
			/>

			<ProductRelated products={productRelated} />
		</PageWrap>
	);
}

export default Product;
