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
		console.log('item: ', item);
		console.log('userId: ', userId);
		const cartRef = collection(doc(db, 'users', userId), 'cart');
		const docRef = await addDoc(cartRef, item);
		return { id: docRef.id, ...item };
	}
);

export const removeFromCart = createAsyncThunk(
	'cart/removeFromCart',
	async ({ userId, id }) => {
		await deleteDoc(doc(db, 'users', userId, 'cart', id));
		return id;
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
