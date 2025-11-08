import s from './Communication.module.scss';

function Communication() {
	return (
		<ul className={s.list}>
			<li className={s.item}>
				<p className={s.title}>Телефон</p>
				<a className={s.link} href='tel:+74958235412'>
					+7 (495) 823-54-12
				</a>
			</li>
			<li className={s.item}>
				<p className={s.title}>E-mail</p>
				<a className={s.link} href='mailto:hello@womazing.com'>
					hello@womazing.com
				</a>
				;
			</li>
			<li className={s.item}>
				<p className={s.title}>Адрес</p>
				<a className={s.link} href='https://yandex.by/maps/-/CLVEuUyI'>
					г. Москва, 3-я улица Строителей, 25
				</a>
			</li>
		</ul>
	);
}

export default Communication;
