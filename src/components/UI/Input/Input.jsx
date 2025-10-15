import s from './Input.module.scss';

function Input({ onChange, className, type, variant, value, placeholder }) {
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

	if (variant === 'textarea') {
		return (
			<textarea
				className={s.textarea}
				value={value}
				placeholder={placeholder}
			></textarea>
		);
	}

	return (
		<input
			className={s.input}
			type={type}
			value={value}
			placeholder={placeholder}
		/>
	);
}

export default Input;
