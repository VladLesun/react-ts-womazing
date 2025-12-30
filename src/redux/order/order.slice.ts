import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from './order.action';
import type { IOrderState } from './order.types';

const initialState: IOrderState = {
	status: 'idle',
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(sendOrder.pending, state => {
				state.status = 'loading';
			})
			.addCase(sendOrder.fulfilled, state => {
				state.status = 'succeeded';
			})
			.addCase(sendOrder.rejected, state => {
				state.status = 'failed';
			});
	},
});

export default orderSlice.reducer;
