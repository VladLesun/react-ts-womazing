import type { RootState } from '../redux.types';

export const selectUserId = (state: RootState) => state.auth.userId;
