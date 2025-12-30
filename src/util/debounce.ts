// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
	fn: T,
	msec: number
) => {
	let lastCallTime: number = 0;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	const debounced = (...args: Parameters<T>): void => {
		const prevCall = lastCallTime;
		lastCallTime = Date.now();

		if (prevCall && lastCallTime - prevCall <= msec && timeoutId)
			clearTimeout(timeoutId);

		timeoutId = setTimeout(() => fn(...args), msec);
	};

	debounced.cancel = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};

	return debounced;
};
