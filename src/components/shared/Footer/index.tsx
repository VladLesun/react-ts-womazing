import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectCategoriesArray } from '../../../redux/filter/filter.select';

import paymentImg from '../../../assets/img/payment-cards.png';

import { Logo, Navigation } from '../../../components';

import s from './Footer.module.scss';

const Footer = () => {
	const categoriesArray = useSelector(selectCategoriesArray).slice(1);

	return (
		<footer className={s.footer}>
			<div className={cn('container', s.container)}>
				<Logo className={s.logo} />
				<Navigation className={s.navigation} />

				<ul className={s.contacts}>
					<li>
						<a href='tel:+74958235412' className={s.phone}>
							+7 (495) 823-54-12
						</a>
					</li>
					<li>
						<a href='mailto:hello@womazing.com' className={s.mail}>
							hello@womazing.com
						</a>
					</li>
				</ul>

				<p className={s.copyright}>
					© Все права защищены
					<br />
					Политика конфиденциальности
					<br />
					Публичная оферта
				</p>

				<ul className={s.categories}>
					{categoriesArray.map(category => (
						<li key={category.id}>
							<Link className={s.category} to={`/shop?category=${category.id}`}>
								{category.name}
							</Link>
						</li>
					))}
				</ul>

				<ul className={s.socials}>
					<li>
						<a
							href='https://www.instagram.com'
							target='_blank'
							className={s.social}
						>
							<svg
								width='22'
								height='23'
								viewBox='0 0 22 23'
								fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M15.6094 0.5H6.39066C2.86683 0.5 0 3.36683 0 6.89066V16.1093C0 19.6332 2.86683 22.5 6.39066 22.5H15.6093C19.1332 22.5 22 19.6332 22 16.1094V6.89066C22 3.36683 19.1332 0.5 15.6094 0.5ZM20.2812 16.1093C20.2812 18.6854 18.1854 20.7812 15.6094 20.7812H6.39066C3.81455 20.7812 1.71875 18.6854 1.71875 16.1094V6.89066C1.71875 4.31455 3.81455 2.21875 6.39066 2.21875H15.6093C18.1854 2.21875 20.2812 4.31455 20.2812 6.89066V16.1093Z' />
								<path d='M11 5.57031C7.73034 5.57031 5.07031 8.23034 5.07031 11.5C5.07031 14.7697 7.73034 17.4297 11 17.4297C14.2697 17.4297 16.9297 14.7697 16.9297 11.5C16.9297 8.23034 14.2697 5.57031 11 5.57031ZM11 15.7109C8.6781 15.7109 6.78906 13.8219 6.78906 11.5C6.78906 9.1781 8.6781 7.28906 11 7.28906C13.3219 7.28906 15.2109 9.1781 15.2109 11.5C15.2109 13.8219 13.3219 15.7109 11 15.7109Z' />
								<path d='M17.0156 6.34375C17.4902 6.34375 17.875 5.95899 17.875 5.48438C17.875 5.00976 17.4902 4.625 17.0156 4.625C16.541 4.625 16.1562 5.00976 16.1562 5.48438C16.1562 5.95899 16.541 6.34375 17.0156 6.34375Z' />
							</svg>
						</a>
					</li>
					<li>
						<a
							href='https://www.facebook.com'
							target='_blank'
							className={s.social}
						>
							<svg
								width='21'
								height='21'
								viewBox='0 0 21 21'
								fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M18.5391 0H2.46094C1.1039 0 0 1.1039 0 2.46094V18.5391C0 19.8961 1.1039 21 2.46094 21H18.5391C19.8961 21 21 19.8961 21 18.5391V2.46094C21 1.1039 19.8961 0 18.5391 0ZM19.3594 18.5391C19.3594 18.9914 18.9914 19.3594 18.5391 19.3594H13.6992V13.3711H16.3253L16.6314 10.8281H13.6992V8.08008C13.6992 7.37865 14.2283 6.84961 14.9297 6.84961H16.7754V4.4707C16.2896 4.40213 15.3525 4.30664 14.9297 4.30664C13.973 4.30664 13.0141 4.71023 12.2989 5.41374C11.5621 6.13857 11.1562 7.08801 11.1562 8.08729V10.8281H8.49023V13.3711H11.1562V19.3594H2.46094C2.00864 19.3594 1.64062 18.9914 1.64062 18.5391V2.46094C1.64062 2.00864 2.00864 1.64062 2.46094 1.64062H18.5391C18.9914 1.64062 19.3594 2.00864 19.3594 2.46094V18.5391Z' />
							</svg>
						</a>
					</li>
					<li>
						<a href='https://www.x.com' target='_blank' className={s.social}>
							<svg
								width='396'
								height='396'
								viewBox='0 0 396 396'
								fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M301.026 37.125H355.608L236.362 173.415L376.645 358.875H266.805L180.774 246.395L82.335 358.875H27.72L155.265 213.098L20.691 37.125H133.32L211.084 139.937L301.026 37.125ZM281.869 326.205H312.114L116.886 68.079H84.4305L281.869 326.205Z' />
							</svg>
						</a>
					</li>
				</ul>

				<img
					className={s.payment}
					src={paymentImg}
					alt='Оплата картами Visa и MasterCard'
				/>
			</div>
		</footer>
	);
};

export default Footer;
