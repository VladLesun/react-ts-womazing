import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TStateStatus } from '../../types/types';
import {
	addToCart,
	clearCart,
	fetchCart,
	removeFromCart,
	updateCartItemQuantity,
} from './cart.action';

export type TCartItem = {
	id: string;
	imgUrl: string;
	productId: string;
	size: string;
	name: string;
	quantity: number;
	price: number;
	color: string;
};

interface ICartState {
	totalPrice: number;
	items: TCartItem[];
	status: TStateStatus;
}

const initialState: ICartState = {
	totalPrice: 0,
	items: [],
	status: 'idle',
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartRealTime(state, action: PayloadAction<TCartItem[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCart.pending, state => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(
				fetchCart.fulfilled,
				(state, action: PayloadAction<TCartItem[]>) => {
					state.status = 'succeeded';
					state.items = action.payload;
				}
			)
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
			.addCase(
				removeFromCart.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.status = 'succeeded';
					state.items = state.items.filter(item => item.id !== action.payload);
				}
			)
			.addCase(removeFromCart.rejected, state => {
				state.status = 'failed';
			})
			.addCase(updateCartItemQuantity.pending, state => {
				state.status = 'loading';
			})
			.addCase(
				updateCartItemQuantity.fulfilled,
				(state, action: PayloadAction<{ id: string; quantity: number }>) => {
					state.status = 'succeeded';
					const item = state.items.find(item => item.id === action.payload.id);
					if (item) item.quantity = action.payload.quantity;
				}
			)
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
