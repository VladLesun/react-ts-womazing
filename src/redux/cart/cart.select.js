export const selectCartItems = state => state.cart.items;
export const selectCartStatus = state => state.cart.status;
export const selectTotalPrice = state =>
	state.cart.items.reduce((acc, item) => {
		return item.quantity * item.price + acc;
	}, 0);
export const selectCartTotalQuantity = state =>
	state.cart.items.reduce((acc, item) => item.quantity + acc, 0);
