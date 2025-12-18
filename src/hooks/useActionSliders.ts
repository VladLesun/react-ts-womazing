import { useCallback, useEffect, useRef, useState } from 'react';
import type { THeroSlidesContent } from '../components/UI/Sliders/HeroSlider/HeroSlider';
import type { TTeamSlidesContent } from '../components/UI/Sliders/TeamSlider/TeamSlider';

type TSlidesProps = THeroSlidesContent[] | TTeamSlidesContent[];

export const useActionSliders = (slides: TSlidesProps, autoplay = 5000) => {
	const [activeId, setActiveId] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const clearTimer = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const startTimer = useCallback(() => {
		if (autoplay && slides.length > 1) {
			intervalRef.current = setInterval(() => {
				setActiveId(prev => (prev + 1) % slides.length);
			}, autoplay);
		}
	}, [autoplay, slides.length]);

	const resetTimer = () => {
		clearTimer();
		startTimer();
	};

	useEffect(() => {
		startTimer();
		return () => clearTimer();
	}, [startTimer]);

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

	const select = (id: number) => {
		setActiveId(id);
		resetTimer();
	};

	return { activeId, setActiveId: select, next, prev };
};
