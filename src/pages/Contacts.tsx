import {
	Communication,
	ContactsForm,
	Map,
	PageTitleContent,
	PageWrap,
} from '../components';

const Contacts = () => {
	return (
		<PageWrap>
			<PageTitleContent children='Контакты' />
			<Map />
			<Communication />
			<ContactsForm />
		</PageWrap>
	);
};

export default Contacts;
