import type { TStateStatus } from '../redux.types';

export type TFeedbackMessage = {
	userId: string;
	message: Record<string, string>;
	feedback: string;
};

export interface IFeedbackState {
	status: TStateStatus;
}
