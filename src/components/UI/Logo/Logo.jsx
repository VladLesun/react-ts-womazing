import cn from 'classnames';
import { Link } from 'react-router';
import s from './Logo.module.scss';

function Logo({ className }) {
	return (
		<Link to='/' className={cn(s.logo, className)}>
			<img src='./img/logo.svg' alt='Логотип сайта' />
			Womazing
		</Link>
	);
}

export default Logo;
