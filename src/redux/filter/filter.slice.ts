import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IFilterState, TFilterCategory } from './filter.types';

const initialState: IFilterState = {
	category: {
		id: 'all',
		name: 'Все',
	},
	categories: [
		{ id: 'all', name: 'Все' },
		{ id: 'coat', name: 'Пальто' },
		{ id: 'sweatshirt', name: 'Свитшоты' },
		{ id: 'cardigan', name: 'Кардиганы' },
		{ id: 'hoodie', name: 'Толстовки' },
	],
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory(state, action: PayloadAction<TFilterCategory>) {
			state.category = action.payload;
		},
	},
});

export const { setCategory } = filterSlice.actions;

export default filterSlice.reducer;
