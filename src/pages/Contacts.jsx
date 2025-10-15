import Communication from '../components/Communication/Communication';
import ContactsForm from '../components/UI/Forms/ContactsForm/ContactsForm';
import Map from '../components/UI/Map/Map';
import PageTitleContent from '../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../components/UI/PageWrap/PageWrap';

function Contacts() {
	return (
		<PageWrap>
			<PageTitleContent children='Контакты' />
			<Map />
			<Communication />
			<ContactsForm />
		</PageWrap>
	);
}

export default Contacts;
