import { lazy } from 'react';
import {
	Communication,
	ContactsForm,
	PageTitleContent,
	PageWrap,
} from '../components';

const MapWidget = lazy(() => import('../components/shared/Map'));

const Contacts = () => {
	return (
		<PageWrap>
			<PageTitleContent children='Контакты' />
			<MapWidget />
			<Communication />
			<ContactsForm />
		</PageWrap>
	);
};

export default Contacts;
