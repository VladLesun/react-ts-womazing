import { createSlice } from '@reduxjs/toolkit';
import type { TStateStatus } from '../../types/types';
import { sendOrder } from './order.action';

interface IOrderState {
	status: TStateStatus;
}

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

// export const {} = orderSlice.actions;

export default orderSlice.reducer;
