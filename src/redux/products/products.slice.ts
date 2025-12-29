import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchProduct, fetchProducts } from './products.action';
import type { IProductsState, TProduct } from './products.types';

const initialState: IProductsState = {
	item: null,
	items: [],
	status: 'idle',
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<TProduct[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(
				fetchProducts.fulfilled,
				(state, action: PayloadAction<TProduct[]>) => {
					state.status = 'succeeded';
					state.items = action.payload;
				}
			)
			.addCase(fetchProducts.rejected, state => {
				state.status = 'failed';
				state.items = [];
			})
			.addCase(fetchProduct.pending, state => {
				state.status = 'loading';
				state.item = null;
			})
			.addCase(
				fetchProduct.fulfilled,
				(state, action: PayloadAction<TProduct>) => {
					state.status = 'succeeded';
					state.item = action.payload;
				}
			)
			.addCase(fetchProduct.rejected, state => {
				state.status = 'failed';
				state.item = null;
			});
	},
});

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
