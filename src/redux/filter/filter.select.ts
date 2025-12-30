import type { RootState } from '../redux.types';

export const selectCategory = (state: RootState) => state.filter.category;
export const selectCategoriesArray = (state: RootState) =>
	state.filter.categories;
