import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../API/firebase';

export const fetchCart = createAsyncThunk('cart/fetchCart', async userId => {
	const cartRef = collection(doc(db, 'users', userId), 'cart');
	const snapshot = await getDocs(cartRef);
	return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async ({ userId, item }) => {
		const cartRef = collection(doc(db, 'users', userId), 'cart');

		// ищем товар с таким productId, размером и цветом
		const q = query(
			cartRef,
			where('productId', '==', item.productId),
			where('size', '==', item.size),
			where('color', '==', item.color)
		);

		const snapshot = await getDocs(q);

		if (!snapshot.empty) {
			// если нашли — обновляем quantity
			const existingDoc = snapshot.docs[0];
			const currentQuantity = existingDoc.data().quantity || 0;
			await updateDoc(existingDoc.ref, {
				quantity: currentQuantity + item.quantity,
			});
			return {
				id: existingDoc.id,
				...existingDoc.data(),
				quantity: currentQuantity + item.quantity,
			};
		} else {
			// если не нашли — создаём новый документ
			const docRef = await addDoc(cartRef, item);
			return { id: docRef.id, ...item };
		}
	}
);

export const removeFromCart = createAsyncThunk(
	'cart/removeFromCart',
	async ({ userId, itemId }) => {
		const itemRef = doc(db, 'users', userId, 'cart', itemId);
		await deleteDoc(itemRef);

		return itemId;
	}
);

export const updateCartItemQuantity = createAsyncThunk(
	'cart/updateCartItemQuantity',
	async ({ userId, id, quantity }) => {
		const itemRef = doc(db, 'users', userId, 'cart', id);
		await updateDoc(itemRef, { quantity });
		return { id, quantity };
	}
);
