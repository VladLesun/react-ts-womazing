import { useDispatch } from 'react-redux';
import type { store } from './store';

export type TStateStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
