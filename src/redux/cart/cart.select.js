export const selectCartItems = state => state.cart.items;
export const selectTotalPrice = state =>
	state.cart.items.reduce((item, acc) => item.quantity * item.price + acc, 0);
export const selectCartTotalQuantity = state =>
	state.cart.items.reduce((acc, item) => item.quantity + acc, 0);
