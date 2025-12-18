import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TFilterCategoryId = 'all' | 'coat' | 'sweatshirt' | 'cardigan' | 'hoodie';
type TFilterCategoryName =
	| 'Все'
	| 'Пальто'
	| 'Свитшоты'
	| 'Кардиганы'
	| 'Толстовки';

export type TFilterCategory = {
	id: TFilterCategoryId;
	name: TFilterCategoryName;
};

type TFilterCategories = TFilterCategory[];

interface IFilterState {
	category: TFilterCategory;
	categories: TFilterCategories;
}

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
