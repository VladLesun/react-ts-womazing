import { createSlice } from '@reduxjs/toolkit';
import {
	addToCart,
	clearCart,
	fetchCart,
	removeFromCart,
	updateCartItemQuantity,
} from './cart.action';

const initialState = {
	totalPrice: 0,
	items: [],
	status: 'idle',
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartRealTime(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: build => {
		build
			.addCase(fetchCart.pending, state => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchCart.rejected, state => {
				state.status = 'failed';
				state.items = [];
			})
			.addCase(addToCart.pending, state => {
				state.status = 'loading';
			})
			.addCase(addToCart.fulfilled, state => {
				state.status = 'succeeded';
			})
			.addCase(addToCart.rejected, state => {
				state.status = 'failed';
			})
			.addCase(removeFromCart.pending, state => {
				state.status = 'loading';
			})
			.addCase(removeFromCart.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = state.items.filter(item => item.id !== action.payload);
			})
			.addCase(removeFromCart.rejected, state => {
				state.status = 'failed';
			})
			.addCase(updateCartItemQuantity.pending, state => {
				state.status = 'loading';
			})
			.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const item = state.items.find(item => item.id === action.payload.id);
				if (item) item.quantity = action.payload.quantity;
			})
			.addCase(updateCartItemQuantity.rejected, state => {
				state.status = 'failed';
			})
			.addCase(clearCart.pending, state => {
				state.status = 'loading';
			})
			.addCase(clearCart.fulfilled, state => {
				state.status = 'succeeded';
				state.items = [];
			})
			.addCase(clearCart.rejected, state => {
				state.status = 'failed';
			});
	},
});

export const { setCartRealTime } = cartSlice.actions;

export default cartSlice.reducer;
