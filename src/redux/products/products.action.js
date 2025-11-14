import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
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

export const fetchProduct = createAsyncThunk(
	'products/fetchProduct',
	async productId => {
		// создаём ссылку на документ
		const docRef = doc(db, 'products', productId);

		// получаем документ
		const snapshot = await getDoc(docRef);

		if (!snapshot.exists()) {
			throw new Error('Продукт не найден');
		}

		// возвращаем данные
		return {
			id: snapshot.id,
			...snapshot.data(),
		};
	}
);
