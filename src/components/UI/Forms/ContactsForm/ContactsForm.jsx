import cn from 'classnames';
import { useState } from 'react';

import { useValidation } from '../../../../hooks/useValidation';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import s from './ContactsForm.module.scss';

function ContactsForm() {
	const [successMessage, setSuccessMessage] = useState(null);

	const { values, errors, refs, validate, handleChange, handleReset } =
		useValidation({ name: '', email: '', phone: '', message: '' }, [
			'name',
			'email',
			'phone',
			'message',
		]);

	const handleSendMessage = () => {
		if (!validate()) return;

		const message = { customer: values };

		setSuccessMessage(
			<p className={s.success}>Сообщение успешно отправлено</p>
		);

		setTimeout(() => setSuccessMessage(null), 5000);

		// handleReset();
	};

	return (
		<form className={s.form}>
			<legend className={s.title}>Напишите нам</legend>
			<fieldset className={s.fieldset}>
				<div>
					<Input
						ref={refs.name}
						name='name'
						value={values.name}
						onChange={handleChange}
						className={cn(s.input, errors.name ? 'error' : '')}
						variant='input'
						type='text'
						placeholder='Имя'
					/>
					{errors.name && <span className='error__text'>{errors.name}</span>}
				</div>
				<div>
					<Input
						ref={refs.email}
						name='email'
						value={values.email}
						onChange={handleChange}
						className={cn(s.input, errors.email ? 'error' : '')}
						variant='input'
						type='email'
						placeholder='E-mail'
					/>
					{errors.email && <span className='error__text'>{errors.email}</span>}
				</div>
				<div>
					<Input
						ref={refs.phone}
						name='phone'
						value={values.phone}
						onChange={handleChange}
						className={cn(s.input, errors.phone ? 'error' : '')}
						variant='input'
						type='tel'
						placeholder='Телефон'
					/>
					{errors.phone && <span className='error__text'>{errors.phone}</span>}
				</div>
				<div>
					<Input
						ref={refs.message}
						name='message'
						value={values.message}
						onChange={handleChange}
						className={cn(s.input, errors.message ? 'error' : '')}
						variant='textarea'
						placeholder='Сообщение'
					/>
					{errors.message && (
						<span className='error__text'>{errors.message}</span>
					)}
				</div>
				<Button
					onClick={handleSendMessage}
					className={s.btn}
					children='Отправить'
				/>
				{successMessage}
			</fieldset>
		</form>
	);
}

export default ContactsForm;
