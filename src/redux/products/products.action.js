import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../API/firebase';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async categoryId => {
		let qProducts;

		if (categoryId && categoryId !== 'all') {
			qProducts = query(
				collection(db, 'products'),
				where('categoryId', '==', categoryId)
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
