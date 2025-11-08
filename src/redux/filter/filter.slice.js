import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	category: {
		id: 'all',
		name: 'Все',
	},
	categoriesArray: [
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
		setCategory(state, action) {
			state.category = action.payload;
		},
		setFilters(state, action) {
			const { category } = action.payload;
			state.category = category;
		},
	},
});

export const { setCategory, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
