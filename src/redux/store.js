import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import cartReducer from './cart/cart.slice';
import filterReducer from './filter/filter.slice';
import productsReducer from './products/products.slice';

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		products: productsReducer,
		cart: cartReducer,
		auth: authReducer,
	},
});
