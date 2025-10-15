import cn from 'classnames';
import s from './Input.module.scss';

function Input({ onChange, className, type, variant, value }) {
	const classes = cn(s.input, s[`input_${variant}`]);

	if (type === 'radio') {
		return (
			<label className={s.label}>
				<input
					className={s.inputHide}
					type={type}
					value={value}
					name={
						variant === 'size'
							? 'size'
							: variant === 'color'
							? 'color'
							: 'payment'
					}
				/>
				<span
					className={
						variant === 'size'
							? s.radioCheckSize
							: variant === 'color'
							? s.radioCheckColor
							: s.radioPayment
					}
					style={{ backgroundColor: value }}
				>
					{variant === 'size' && value}
				</span>
			</label>
		);
	}

	if (variant === 'count') {
		return <input className={s.count} type={type} value={value} />;
	}

	return <input className={classes} type={type} value={value} />;
}

export default Input;
