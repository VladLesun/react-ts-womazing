import cn from 'classnames';
import { Link } from 'react-router';
import logoSvg from '../../../assets/img/logo.svg';
import s from './Logo.module.scss';

function Logo({ className }) {
	return (
		<Link to='/' className={cn(s.logo, className)}>
			<img src={logoSvg} alt='Логотип сайта' />
			Womazing
		</Link>
	);
}

export default Logo;
