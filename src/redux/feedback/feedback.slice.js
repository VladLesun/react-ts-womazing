import { createSlice } from '@reduxjs/toolkit';
import { sendFeedback } from './feedback.action';

const initialState = {
	status: 'idle',
};

const feedbackSlice = createSlice({
	name: 'feedback',
	initialState,
	reducers: {
		resetStatus(state) {
			state.status = 'idle';
		},
	},
	extraReducers: builder => {
		builder
			.addCase(sendFeedback.pending, state => {
				state.status = 'loading';
			})
			.addCase(sendFeedback.fulfilled, state => {
				state.status = 'succeeded';
			})
			.addCase(sendFeedback.rejected, state => {
				state.status = 'failed';
			});
	},
});

export const { resetStatus } = feedbackSlice.actions;

export default feedbackSlice.reducer;
