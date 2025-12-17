import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../API/firebase';

type TSendOrder = {
	userId: string;
	order: string[];
};

export const sendOrder = createAsyncThunk<void, TSendOrder>(
	'order/sendOrder',
	async ({ userId, order }) => {
		const orderRef = collection(doc(db, 'users', userId), 'orders');

		await addDoc(orderRef, order);
	}
);
