import { ProductCard } from '../../../../components';
import type { TProductRelated } from '../product.types';

import s from './ProductRelated.module.scss';

const ProductRelated = ({ products }: TProductRelated) => {
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
						sale={product.sale}
					/>
				))}
			</ul>
		</div>
	);
};

export default ProductRelated;
