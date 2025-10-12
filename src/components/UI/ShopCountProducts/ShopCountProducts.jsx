import s from './ShopCountProducts.module.scss';

function ShopCountProducts() {
	return (
		<p className={s.desc}>
			Показано: <span>9</span> из <span>12</span> товаров
		</p>
	);
}

export default ShopCountProducts;
