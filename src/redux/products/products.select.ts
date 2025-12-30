import type { RootState } from '../redux.types';

export const selectProduct = (state: RootState) => state.products.item;
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
