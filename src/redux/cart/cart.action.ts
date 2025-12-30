import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../../API/firebase';
import type { TCartItem } from './cart.types';

export const fetchCart = createAsyncThunk(
	'cart/fetchCart',
	async (userId: string, { rejectWithValue }) => {
		try {
			const cartRef = collection(doc(db, 'users', userId), 'cart');
			const snapshot = await getDocs(cartRef);
			return snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			})) as TCartItem[];
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message || 'Не удалось загрузить корзину');
			} else {
				return rejectWithValue('Произошла неизвестная ошибка');
			}
		}
	}
);

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async (
		{ userId, item }: { userId: string; item: TCartItem },
		{ rejectWithValue }
	) => {
		try {
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
				} as TCartItem;
			} else {
				// если не нашли — создаём новый документ
				const docRef = await addDoc(cartRef, item);
				const newItem: TCartItem = {
					id: docRef.id,
					imgUrl: item.imgUrl,
					productId: item.productId,
					size: item.size,
					name: item.name,
					quantity: item.quantity,
					price: item.price,
					color: item.color,
				};
				return newItem;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(
					error.message || 'Не удалось добавить товар в корзину'
				);
			} else {
				return rejectWithValue('Произошла неизвестная ошибка');
			}
		}
	}
);

export const removeFromCart = createAsyncThunk<
	string,
	{ userId: string; id: string }
>('cart/removeFromCart', async ({ userId, id }, { rejectWithValue }) => {
	try {
		const itemRef = doc(db, 'users', userId, 'cart', id);
		await deleteDoc(itemRef);

		return id;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(
				error.message || 'Не удалось удалить товар из корзины'
			);
		} else {
			return rejectWithValue('Произошла неизвестная ошибка');
		}
	}
});

export const updateCartItemQuantity = createAsyncThunk(
	'cart/updateCartItemQuantity',
	async (
		{
			userId,
			id,
			quantity,
		}: {
			userId: string;
			id: string;
			quantity: number;
		},
		{ rejectWithValue }
	) => {
		try {
			const itemRef = doc(db, 'users', userId, 'cart', id);
			await updateDoc(itemRef, { quantity });
			return { id, quantity };
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message || 'Не удалось обновить корзину');
			} else {
				return rejectWithValue('Произошла неизвестная ошибка');
			}
		}
	}
);

export const clearCart = createAsyncThunk<boolean, string>(
	'cart/clearCart',
	async (userId, { rejectWithValue }) => {
		try {
			const cartRef = collection(doc(db, 'users', userId), 'cart');
			const snapshot = await getDocs(cartRef);

			const promises = snapshot.docs.map(doc => deleteDoc(doc.ref));
			await Promise.all(promises);

			return true;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message || 'Не удалось очистить корзину');
			} else {
				return rejectWithValue('Произошла неизвестная ошибка');
			}
		}
	}
);
