import ProductCard from '../UI/ProductCard/ProductCard';
import s from './RelatedProducts.module.scss';

function RelatedProducts({ products }) {
	return (
		<div>
			<h2 className={s.title}>Связанные товары</h2>

			<ul className={s.list}>
				{products?.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						imgUrl={product.imgUrl}
						title={product.title}
						price={product.price}
						sale={product?.sale}
					/>
				))}
			</ul>
		</div>
	);
}

export default RelatedProducts;
