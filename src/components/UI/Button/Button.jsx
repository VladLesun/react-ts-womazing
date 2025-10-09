import cn from 'classnames';
import s from './Button.module.scss';

function Button({ children, href, onClick, variant = 'primary', className }) {
	const classes = cn(s.btn, s[`btn_${variant}`], className);

	if (href) {
		return (
			<a href='/shop' className={classes}>
				{children}
			</a>
		);
	}

	return (
		<button onClick={onClick} className={classes}>
			{children}
		</button>
	);
}

export default Button;
