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
	name,
	ref,
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
					{variant === 'size'
						? value
						: variant === 'payment'
						? placeholder
						: ''}
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
				min={1}
				max={99}
			/>
		);
	}

	if (variant === 'textarea') {
		return (
			<textarea
				ref={ref}
				name={name}
				value={value}
				onChange={onChange}
				className={cn(s.textarea, className)}
				placeholder={placeholder}
			></textarea>
		);
	}

	return (
		<input
			ref={ref}
			name={name}
			value={value}
			onChange={onChange}
			className={cn(s.input, className)}
			type={type}
			placeholder={placeholder}
		/>
	);
}

export default Input;
