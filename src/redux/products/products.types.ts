import type { TStateStatus } from '../redux.types';

type TProductSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type TProduct = {
	categoryId: string;
	id: string;
	imgUrl: string;
	name: string;
	color: string[];
	size: TProductSize[];
	price: number;
	sale?: number;
};

export interface IProductsState {
	item: null | TProduct;
	items: TProduct[];
	status: TStateStatus;
}
