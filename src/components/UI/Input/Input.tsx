import cn from 'classnames';

import { forwardRef, type ChangeEventHandler, type Ref } from 'react';
import s from './Input.module.scss';

type TInputProps = {
	checked?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	className?: string;
	type: string;
	variant?:
		| 'count'
		| 'textarea'
		| 'radio'
		| 'default'
		| 'color'
		| 'size'
		| 'payment';
	value: string | number;
	placeholder?: string;
	name?: string;
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, TInputProps>(
	(
		{ checked, onChange, className, type, variant, value, placeholder, name },
		ref
	) => {
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
						style={{
							backgroundColor: variant === 'color' ? String(value) : undefined,
						}}
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
					onChange={onChange as ChangeEventHandler<HTMLInputElement>}
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
					ref={ref as Ref<HTMLTextAreaElement>}
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
				ref={ref as Ref<HTMLInputElement>}
				name={name}
				value={value}
				onChange={onChange}
				className={cn(s.input, className)}
				type={type}
				placeholder={placeholder}
			/>
		);
	}
);

export default Input;
