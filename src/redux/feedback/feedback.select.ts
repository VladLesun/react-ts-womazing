import type { RootState } from '../store';

export const selectFeedbackStatus = (state: RootState) => state.feedback.status;
