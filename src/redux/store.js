import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/filter.slice';
import productsReducer from './products/products.slice';

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		products: productsReducer,
	},
});
