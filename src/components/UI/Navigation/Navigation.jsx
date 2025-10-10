import cn from 'classnames';
import { Link, useLocation } from 'react-router';
import s from './Navigation.module.scss';

const categories = [
	{ href: '/', title: 'Главная' },
	{ href: '/shop', title: 'Магазин' },
	{ href: '/about-brand', title: 'О бренде' },
	{ href: '/contacts', title: 'Контакты' },
];

function Navigation({ className }) {
	const location = useLocation();

	return (
		<ul className={cn(s.list, className)}>
			{categories?.map(({ href, title }) => (
				<li key={title}>
					<Link
						to={href}
						className={cn(
							s.item,
							location.pathname === href ? s.item_active : ''
						)}
					>
						{title}
					</Link>
				</li>
			))}
		</ul>
	);
}

export default Navigation;
