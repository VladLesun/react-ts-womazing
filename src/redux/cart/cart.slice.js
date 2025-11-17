import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: [],
	status: 'idle',
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItems(state, action) {
			state.items = action.payload;
		},
		removeItem(state, action) {
			state.items = state.items.filter(item => item.id !== action.payload.id);
		},
		clearCart(state) {
			state.items = [];
		},
	},
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
