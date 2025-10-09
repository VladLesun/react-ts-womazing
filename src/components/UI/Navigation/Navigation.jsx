import cn from 'classnames';
import s from './Navigation.module.scss';

function Navigation({ className }) {
	return (
		<ul className={cn(s.list, className)}>
			<li className={cn(s.item, s.item_active)}>
				<a href='/'>Главная</a>
			</li>
			<li className={s.item}>
				<a href='#!'>Магазин</a>
			</li>
			<li className={s.item}>
				<a href='#!'>О бренде</a>
			</li>
			<li className={s.item}>
				<a href='#!'>Контакты</a>
			</li>
		</ul>
	);
}

export default Navigation;
