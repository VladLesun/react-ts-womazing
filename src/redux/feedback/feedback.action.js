import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../API/firebase';

export const sendFeedback = createAsyncThunk(
	'feedback/sendFeedback',
	async ({ userId, obj, feedback }) => {
		if (!['feedback', 'writeUs'].includes(feedback)) {
			throw new Error('Invalid feedback type');
		}
		const feedbackRef = collection(doc(db, 'users', userId), feedback);

		await addDoc(feedbackRef, obj);
	}
);
