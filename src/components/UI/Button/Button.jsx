import cn from 'classnames';
import { Link } from 'react-router-dom';
import s from './Button.module.scss';

function Button({ children, href, onClick, variant = 'primary', className }) {
	const classes = cn(s.btn, s[`btn_${variant}`], className);

	if (href) {
		return (
			<Link to={href} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<button onClick={onClick} className={classes}>
			{children}
		</button>
	);
}

export default Button;
