import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/filter.slice';

export const store = configureStore({
	reducer: {
		filter: filterReducer,
	},
});
