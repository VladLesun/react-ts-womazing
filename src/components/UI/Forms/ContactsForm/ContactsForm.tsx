import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../../../../redux/auth/auth.select';
import { sendFeedback } from '../../../../redux/feedback/feedback.action';
import { selectFeedbackStatus } from '../../../../redux/feedback/feedback.select';
import { resetStatus } from '../../../../redux/feedback/feedback.slice';

import { useValidation } from '../../../../hooks/useValidation';
import type { AppDispatch } from '../../../../redux/store';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import s from './ContactsForm.module.scss';

const ContactsForm = () => {
	const dispatch = useDispatch<AppDispatch>();

	const userId = useSelector(selectUserId);
	const feedbackStatus = useSelector(selectFeedbackStatus);

	const { values, errors, refs, validate, handleChange, handleReset } =
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
						ref={refs.name}
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
						ref={refs.email}
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
						ref={refs.phone}
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
				{resultMessage}
			</fieldset>
		</form>
	);
};

export default ContactsForm;
