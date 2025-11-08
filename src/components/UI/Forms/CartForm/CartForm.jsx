import cn from 'classnames';

import Button from '../../Button/Button';
import Input from '../../Input/Input';
import s from './CartForm.module.scss';

import img1 from '../../../../assets/img/products/img1.png';

function CartForm() {
	return (
		<form className={s.form}>
			<div className={s.tableMobile}>
				<table className={s.table}>
					<thead>
						<tr className={s.head}>
							<th className={s.th}>Товар</th>
							<th className={s.th}>Цена</th>
							<th className={s.th}>Количество</th>
							<th className={s.th}>Всего</th>
						</tr>
					</thead>
					<tbody>
						<tr className={s.body}>
							<td className={cn(s.td, s.td_first)}>
								<button className={s.remove}>
									<svg
										width='14'
										height='14'
										viewBox='0 0 14 14'
										stroke='currentColor'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M1 1L13 13M13 1L1 13' />
									</svg>
								</button>

								<img className={s.image} src={img1} alt='Product name' />

								<p>Футболка USA</p>
							</td>
							<td className={s.td}>
								<p>$129</p>
							</td>
							<td className={s.td}>
								<Input variant='count' type='number' value={1} />
							</td>
							<td className={s.td}>
								<p>$129</p>
							</td>
						</tr>
						<tr className={s.body}>
							<td className={cn(s.td, s.td_first)}>
								<button className={s.remove}>
									<svg
										width='14'
										height='14'
										viewBox='0 0 14 14'
										stroke='currentColor'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M1 1L13 13M13 1L1 13' />
									</svg>
								</button>

								<img className={s.image} src={img1} alt='Product name' />

								<p>Футболка USA</p>
							</td>
							<td className={s.td}>
								<p>$129</p>
							</td>
							<td className={s.td}>
								<Input variant='count' type='number' value={1} />
							</td>
							<td className={s.td}>
								<p>$129</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className={s.promoWrap}>
				<div className={s.promo}>
					<Input type='text' placeholder='Введите купон' />
					<Button children='Применить купон' variant='secondary' />
				</div>

				<Button children='Обновить корзину' variant='secondary' />
			</div>

			<div className={s.order}>
				<p className={s.total}>
					Итого: <span className={s.totalPrice}>$129</span>
				</p>

				<Button children='Оформить заказ' />
			</div>
		</form>
	);
}

export default CartForm;
