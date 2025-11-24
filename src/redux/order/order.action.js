import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../API/firebase';

export const sendOrder = createAsyncThunk(
	'order/sendOrder',
	async ({ userId, order }) => {
		const orderRef = collection(doc(db, 'users', userId), 'orders');

		await addDoc(orderRef, order);
	}
);
