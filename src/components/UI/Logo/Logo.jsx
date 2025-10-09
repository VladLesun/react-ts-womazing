import cn from 'classnames';
import s from './Logo.module.scss';

function Logo({ className }) {
	return (
		<a href='/' className={cn(s.logo, className)}>
			<img src='./img/logo.svg' alt='Логотип сайта' />
			Womazing
		</a>
	);
}

export default Logo;
