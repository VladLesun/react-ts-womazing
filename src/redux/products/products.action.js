import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../API/firebase';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async category => {
		let qProducts;

		if (category?.id && category?.id !== 'all') {
			qProducts = query(
				collection(db, 'products'),
				where('categoryId', '==', category?.id)
			);
		} else {
			qProducts = query(collection(db, 'products'));
		}

		const snapshot = await getDocs(qProducts);

		const products = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));

		return products;
	}
);
