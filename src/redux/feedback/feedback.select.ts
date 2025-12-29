import type { RootState } from '../redux.types';

export const selectFeedbackStatus = (state: RootState) => state.feedback.status;
