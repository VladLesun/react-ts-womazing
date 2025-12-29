import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../API/firebase';
import type { TFeedbackMessage } from './feedback.types';

export const sendFeedback = createAsyncThunk<void, TFeedbackMessage>(
	'feedback/sendFeedback',
	async ({ userId, message, feedback }) => {
		if (!['feedback', 'writeUs'].includes(feedback)) {
			throw new Error('Invalid feedback type');
		}
		const feedbackRef = collection(doc(db, 'users', userId), feedback);

		await addDoc(feedbackRef, message);
	}
);
