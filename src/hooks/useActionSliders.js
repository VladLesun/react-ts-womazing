import { useEffect, useRef, useState } from 'react';

export const useActionSliders = (slides, autoplay = 5000) => {
	const [activeId, setActiveId] = useState(0);
	const intervalRef = useRef(null);

	const clearTimer = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const startTimer = () => {
		if (autoplay && slides.length > 1) {
			intervalRef.current = setInterval(() => {
				setActiveId(prev => (prev + 1) % slides.length);
			}, autoplay);
		}
	};

	const resetTimer = () => {
		clearTimer();
		startTimer();
	};

	useEffect(() => {
		startTimer();
		return () => clearTimer();
	}, [autoplay, slides.length]);

	const getNextId = () => (activeId === slides.length - 1 ? 0 : activeId + 1);

	const getPrevId = () => (activeId === 0 ? slides.length - 1 : activeId - 1);

	const next = () => {
		setActiveId(getNextId());
		resetTimer();
	};

	const prev = () => {
		setActiveId(getPrevId());
		resetTimer();
	};

	const select = id => {
		setActiveId(id);
		resetTimer();
	};

	return { activeId, setActiveId: select, next, prev };
};
