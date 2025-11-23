import confirmedSvg from '../../assets/img/confirmed.svg';
import Button from '../../components/UI/Button/Button';
import PageTitleContent from '../../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../../components/UI/PageWrap/PageWrap';
import s from './OrderConfirmed.module.scss';

function OrderConfirmed() {
	return (
		<PageWrap>
			<PageTitleContent children='Заказ получен' />

			<div className={s.content}>
				<div className={s.wrap}>
					<img
						src={confirmedSvg}
						alt='Изображение подтверждения отправки заказа'
					/>

					<div>
						<h2 className={s.title}>Заказ успешно оформлен</h2>
						<p className={s.desc}>Мы свяжемся с вами в ближайшее время!</p>
					</div>
				</div>

				<Button
					className={s.link}
					children='Перейти на главную'
					href='/'
					variant='secondary'
				/>
			</div>
		</PageWrap>
	);
}

export default OrderConfirmed;
