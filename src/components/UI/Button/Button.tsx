import cn from 'classnames';
import type { PointerEventHandler } from 'react';
import { Link } from 'react-router-dom';
import s from './Button.module.scss';

type TButtonProps = {
	children: string;
	href?: string;
	onClick?: PointerEventHandler<HTMLButtonElement>;
	variant?: string;
	className?: string;
};

const Button = ({
	children,
	href,
	onClick,
	variant = 'primary',
	className,
}: TButtonProps) => {
	const classes = cn(s.btn, s[`btn_${variant}`], className);

	if (href) {
		return (
			<Link to={href} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<button type='button' onClick={onClick} className={classes}>
			{children}
		</button>
	);
};

export default Button;
