import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../API/firebase';
import type { TOrder } from '../../components/UI/Forms/OrderForm/OrderForm';

type TSendOrder = {
	userId: string;
	order: TOrder;
};

export const sendOrder = createAsyncThunk<void, TSendOrder>(
	'order/sendOrder',
	async ({ userId, order }) => {
		const orderRef = collection(doc(db, 'users', userId), 'orders');

		await addDoc(orderRef, order);
	}
);
