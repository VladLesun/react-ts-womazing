import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDF3oBLW18CwR1gef4xH36RZJE4JXK21Y4',
	authDomain: 'api-womazing-app.firebaseapp.com',
	projectId: 'api-womazing-app',
	storageBucket: 'api-womazing-app.firebasestorage.app',
	messagingSenderId: '1011742910849',
	appId: '1:1011742910849:web:f98e8e3dfd1d4d11a56080',
	measurementId: 'G-RN1EH33EZC',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
