import type { RootState } from '../redux.types';

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectTotalPrice = (state: RootState) =>
	state.cart.items.reduce((acc, item) => {
		return item.quantity * item.price + acc;
	}, 0);
export const selectCartTotalQuantity = (state: RootState) =>
	state.cart.items.reduce((acc, item) => item.quantity + acc, 0);
