import cn from 'classnames';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../../redux/auth/auth.select';
import { sendFeedback } from '../../redux/feedback/feedback.action';
import { selectFeedbackStatus } from '../../redux/feedback/feedback.select';

import { useValidation } from '../../hooks/useValidation';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import s from './FeedbackModal.module.scss';

Modal.setAppElement('#root');

type TModal = {
	isOpen: boolean;
	onRequestClose: () => void;
};

const FeedbackModal = ({ isOpen, onRequestClose }: TModal) => {
	const dispatch = useDispatch();
	const { values, errors, refs, validate, handleChange, handleReset } =
		useValidation({ name: '', email: '', phone: '' }, [
			'name',
			'email',
			'phone',
		]);

	const userId = useSelector(selectUserId);
	const feedbackStatus = useSelector(selectFeedbackStatus);

	const handleSendOrder = () => {
		if (!validate()) return;

		dispatch(sendFeedback({ userId, message: values, feedback: 'feedback' }));

		handleReset();
	};

	let content = (
		<>
			<button
				className={s.close}
				onClick={onRequestClose}
				aria-label='закрытия окна обратной связи'
			>
				<svg
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M0.353577 0.353516L14.8536 14.8535M14.8536 0.353516L0.353577 14.8535'
						stroke='black'
					/>
				</svg>
			</button>

			<form>
				<fieldset className={s.wrap}>
					<legend className={s.title}>Заказать обратный звонок</legend>
					<div>
						<Input
							ref={refs.name}
							value={values.name}
							onChange={handleChange}
							name='name'
							className={errors.name ? cn(s.input, 'error') : cn(s.input, '')}
							type='text'
							placeholder='Имя'
						/>
						{errors.name && <span className='error__text'>{errors.name}</span>}
					</div>
					<div>
						<Input
							ref={refs.email}
							value={values.email}
							onChange={handleChange}
							name='email'
							className={errors.email ? cn(s.input, 'error') : cn(s.input, '')}
							type='email'
							placeholder='E-mail'
						/>
						{errors.email && (
							<span className='error__text'>{errors.email}</span>
						)}
					</div>
					<div>
						<Input
							ref={refs.phone}
							value={values.phone}
							onChange={handleChange}
							name='phone'
							className={errors.phone ? cn(s.input, 'error') : cn(s.input, '')}
							type='tel'
							placeholder='Телефон'
						/>
						{errors.phone && (
							<span className='error__text'>{errors.phone}</span>
						)}
					</div>

					<Button onClick={handleSendOrder} children='Заказать звонок' />
				</fieldset>
			</form>
		</>
	);

	if (feedbackStatus === 'loading') {
		content = <p className={s.title}>Загрузка...</p>;
	}

	if (feedbackStatus === 'succeeded') {
		content = (
			<>
				<h2 className={s.title}>Отлично! Мы скоро вам перезвоним.</h2>
				<Button
					className={s.btn}
					onClick={onRequestClose}
					children='Закрыть'
					variant='secondary'
				/>
			</>
		);
	}

	if (feedbackStatus === 'failed') {
		content = <p className={s.title}>Произошла ошибка...</p>;
	}

	return (
		<Modal
			className={{
				base: !feedbackStatus ? s.modal : cn(s.modal, s.modalWidth),
				afterOpen: s.modalOpen,
				beforeClose: s.modalClose,
			}}
			overlayClassName={{
				base: s.overlay,
				afterOpen: s.overlayOpen,
				beforeClose: s.overlayClose,
			}}
			closeTimeoutMS={500}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel='окно обратной связи'
		>
			{content}
		</Modal>
	);
};

export default FeedbackModal;
