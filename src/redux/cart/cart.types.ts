import type { TStateStatus } from '../redux.types';

export type TCartItem = {
	id: string;
	imgUrl: string;
	productId: string;
	size: string;
	name: string;
	quantity: number;
	price: number;
	color: string;
};

export interface ICartState {
	totalPrice: number;
	items: TCartItem[];
	status: TStateStatus;
}
