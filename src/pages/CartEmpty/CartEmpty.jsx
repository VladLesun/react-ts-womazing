import { Link } from 'react-router-dom';
import s from './CartEmpty.module.scss';

function CartEmpty() {
	return (
		<div className={s.wrap}>
			<p className={s.desc}>
				Вероятней всего, вы еще ничего не заказывали.
				<br />
				Для того, чтобы заказать одежду,{' '}
				<Link className={s.link} to='/shop'>
					перейдите в наш магазин
				</Link>
				.
			</p>
		</div>
	);
}

export default CartEmpty;
