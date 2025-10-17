import { useParams } from 'react-router';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import ProductForm from '../components/UI/Forms/ProductForm/ProductForm';
import PageTitleContent from '../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../components/UI/PageWrap/PageWrap';

function Product({ collectionProducts }) {
	const { id } = useParams();
	const product = collectionProducts?.find(item => item.id === id);
	const relatedProducts = collectionProducts?.filter(item => item.id !== id);

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

			<RelatedProducts products={relatedProducts} />
		</PageWrap>
	);
}

export default Product;
