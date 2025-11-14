import ProductRelated from '../components/Product/ProductRelated/ProductRelated';
import ProductForm from '../components/UI/Forms/ProductForm/ProductForm';
import PageTitleContent from '../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../components/UI/PageWrap/PageWrap';

function Product() {
	// const { products } = useProducts();
	// console.log('products: ', products); //! убрать после добавления продуктов в редакс
	// const { productId } = useParams();
	// const product = products?.find(item => item.id === productId);
	// const productRelated = products?.filter(item => item.id !== productId);

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
