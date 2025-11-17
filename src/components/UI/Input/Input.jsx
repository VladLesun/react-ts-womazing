import cn from 'classnames';

import s from './Input.module.scss';

function Input({
	checked,
	onChange,
	className,
	type,
	variant,
	value,
	placeholder,
}) {
	if (type === 'radio') {
		return (
			<label className={s.label}>
				<input
					value={value}
					onChange={onChange}
					checked={checked}
					className={s.inputHide}
					type={type}
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
		return (
			<input
				value={value}
				onChange={onChange}
				className={cn(s.count, className)}
				type={type}
				max='99'
				min='0'
			/>
		);
	}

	if (variant === 'textarea') {
		return (
			<textarea
				value={value}
				onChange={onChange}
				className={s.textarea}
				placeholder={placeholder}
			></textarea>
		);
	}

	return (
		<input
			value={value}
			onChange={onChange}
			className={s.input}
			type={type}
			placeholder={placeholder}
		/>
	);
}

export default Input;
