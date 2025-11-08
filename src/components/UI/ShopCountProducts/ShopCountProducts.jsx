import s from './ShopCountProducts.module.scss';

function ShopCountProducts({ productLength }) {
	return (
		<p className={s.desc}>
			Показано: <span>{productLength}</span> из <span>12</span> товаров
		</p>
	);
}

export default ShopCountProducts;
