import cn from 'classnames';
import { NavLink } from 'react-router';
import s from './Navigation.module.scss';

const categories = [
	{ href: '/', title: 'Главная' },
	{ href: '/shop', title: 'Магазин' },
	{ href: '/about-brand', title: 'О бренде' },
	{ href: '/contacts', title: 'Контакты' },
];

function Navigation({ className }) {
	return (
		<ul className={cn(s.list, className)}>
			{categories?.map(({ href, title }) => (
				<li key={title}>
					<NavLink
						to={href}
						className={({ isActive }) => cn(s.item, isActive && s.item_active)}
					>
						{title}
					</NavLink>
				</li>
			))}
		</ul>
	);
}

export default Navigation;
