import cn from 'classnames';
import { useSelector } from 'react-redux';

import { Button, Input } from '../../../../components';
import { useValidation } from '../../../../hooks/useValidation';
import {
	resetStatus,
	selectFeedbackStatus,
	selectUserId,
	sendFeedback,
} from '../../../../redux';
import { useAppDispatch } from '../../../../redux/redux.types';

import s from './ContactsForm.module.scss';

const ContactsForm = () => {
	const dispatch = useAppDispatch();

	const userId = useSelector(selectUserId);
	const feedbackStatus = useSelector(selectFeedbackStatus);

	const { values, errors, getFieldRef, validate, handleChange, handleReset } =
		useValidation({ name: '', email: '', phone: '', message: '' }, [
			'name',
			'email',
			'phone',
			'message',
		]);

	let resultMessage = null;

	if (feedbackStatus === 'succeeded') {
		resultMessage = (
			<p className={s.resultMessage}>Сообщение успешно отправлено</p>
		);
	}

	if (feedbackStatus === 'failed') {
		resultMessage = (
			<p className={s.resultMessage}>Произошла ошибка при отправке</p>
		);
	}

	const handleSendMessage = () => {
		if (!validate()) return;

		if (userId) {
			dispatch(sendFeedback({ userId, message: values, feedback: 'writeUs' }))
				.unwrap()
				.then(() => {
					setTimeout(() => dispatch(resetStatus()), 5000);
					handleReset();
				});
		}
	};

	return (
		<form className={s.form}>
			<legend className={s.title}>Напишите нам</legend>
			<fieldset className={s.fieldset}>
				<div>
					<Input
						ref={getFieldRef('name')}
						name='name'
						value={values.name}
						onChange={handleChange}
						className={cn(s.input, errors.name ? 'error' : '')}
						type='text'
						placeholder='Имя'
					/>
					{errors.name && <span className='error__text'>{errors.name}</span>}
				</div>
				<div>
					<Input
						ref={getFieldRef('email')}
						name='email'
						value={values.email}
						onChange={handleChange}
						className={cn(s.input, errors.email ? 'error' : '')}
						type='email'
						placeholder='E-mail'
					/>
					{errors.email && <span className='error__text'>{errors.email}</span>}
				</div>
				<div>
					<Input
						ref={getFieldRef('phone')}
						name='phone'
						value={values.phone}
						onChange={handleChange}
						className={cn(s.input, errors.phone ? 'error' : '')}
						type='tel'
						placeholder='Телефон'
					/>
					{errors.phone && <span className='error__text'>{errors.phone}</span>}
				</div>
				<div>
					<Input
						ref={getFieldRef('message')}
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
				{resultMessage}
			</fieldset>
		</form>
	);
};

export default ContactsForm;
