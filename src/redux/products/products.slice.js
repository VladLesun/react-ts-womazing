import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './products.action';

const initialState = {
	items: [],
	status: 'idle',
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.items = [];
			});
	},
});

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
