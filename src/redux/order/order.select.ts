import type { RootState } from '../redux.types';

export const selectOrderStatus = (state: RootState) => state.order.status;
