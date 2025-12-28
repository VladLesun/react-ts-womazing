import Communication from '../components/features/Communication';
import Map from '../components/shared/Map';
import PageTitleContent from '../components/shared/PageTitleContent';
import PageWrap from '../components/shared/PageWrap';
import ContactsForm from '../components/ui/Forms/ContactsForm';

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
