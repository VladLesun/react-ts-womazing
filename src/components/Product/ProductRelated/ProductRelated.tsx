import ProductCard from '../ProductCard/ProductCard';
import s from './ProductRelated.module.scss';

type TProducts = {
	id: string;
	imgUrl: string;
	name: string;
	price: number;
	sale?: number;
};

const ProductRelated = ({ products }: TProducts[]) => {
	return (
		<div>
			<h2 className={s.title}>Связанные товары</h2>

			<ul className={s.list}>
				{products?.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						imgUrl={product.imgUrl}
						name={product.name}
						price={product.price}
						sale={product?.sale}
					/>
				))}
			</ul>
		</div>
	);
};

export default ProductRelated;
