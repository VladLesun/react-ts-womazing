import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import type { TCategory, TNavigation } from './Navigation.types';

import s from './Navigation.module.scss';

const categories: TCategory[] = [
	{ href: '/', title: 'Главная' },
	{ href: '/shop', title: 'Магазин' },
	{ href: '/about-brand', title: 'О бренде' },
	{ href: '/contacts', title: 'Контакты' },
];

const Navigation = ({
	isOpenBurger,
	className,
	onClick,
	variant,
}: TNavigation) => {
	return (
		<ul
			className={cn(
				s.list,
				className,
				isOpenBurger && variant === 'burger' && s.list_burger
			)}
		>
			{categories.map(({ href, title }) => (
				<li key={href}>
					<NavLink
						onClick={onClick}
						to={href}
						className={({ isActive }) =>
							cn(
								s.item,
								isActive && s.item_active,
								isOpenBurger && variant === 'burger' && s.item_burger
							)
						}
					>
						{title}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default Navigation;
