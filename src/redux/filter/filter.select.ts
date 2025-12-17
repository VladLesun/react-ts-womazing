import type { RootState } from '../store';

export const selectCategory = (state: RootState) => state.filter.category;
export const selectCategoriesArray = (state: RootState) =>
	state.filter.categories;
