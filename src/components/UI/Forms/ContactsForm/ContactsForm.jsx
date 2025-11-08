import Button from '../../Button/Button';
import Input from '../../Input/Input';
import s from './ContactsForm.module.scss';

function ContactsForm() {
	return (
		<form className={s.form}>
			<legend className={s.title}>Напишите нам</legend>
			<fieldset className={s.fieldset}>
				<Input variant='input' type='text' placeholder='Имя' />
				<Input variant='input' type='email' placeholder='E-mail' />
				<Input variant='input' type='tel' placeholder='Телефон' />
				<Input variant='textarea' placeholder='Сообщение' />
				<Button className={s.btn} children='Отправить' />
			</fieldset>
		</form>
	);
}

export default ContactsForm;
