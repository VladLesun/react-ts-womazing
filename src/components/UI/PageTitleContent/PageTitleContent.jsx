import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { selectProduct } from '../../../redux/products/products.select';
import s from './PageTitleContent.module.scss';

const segmentNames = {
	shop: 'Магазин',
	'about-brand': 'О брэнде',
	contacts: 'Контакты',
	cart: 'Корзина',
};

function PageTitleContent({ children }) {
	const location = useLocation();
	const segments = location.pathname.split('/').filter(Boolean);

	const product = useSelector(selectProduct);

	const crumbs = segments.map((segment, index) => {
		const href = `/${segments.slice(0, index + 1).join('/')}`;

		let label = segmentNames[segment] || segment;
		if (segments[index - 1] === 'shop' && product?.id) {
			label = product?.name;
		}

		return { keyId: segment, label, href };
	});

	return (
		<div className={s.wrap}>
			<h1 className={s.title}>{children}</h1>

			<ul className={s.list}>
				<li className={s.item}>
					<Link className={s.link} to='/'>
						Главная
					</Link>
				</li>

				{crumbs.map((crumb, index) => {
					const isLast = index === segments.length - 1;
					return (
						<li key={crumb.keyId} className={s.item}>
							{isLast ? (
								<span className={s.label}>{crumb.label}</span>
							) : (
								<Link className={s.link} to={crumb.href}>
									{crumb.label}
								</Link>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default PageTitleContent;
