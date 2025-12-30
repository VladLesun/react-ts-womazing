import type { TOrder } from '../../components/UI/Forms/OrderForm';
import type { TStateStatus } from '../redux.types';

export type TSendOrder = {
	userId: string;
	order: TOrder;
};

export interface IOrderState {
	status: TStateStatus;
}
