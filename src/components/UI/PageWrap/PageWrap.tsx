import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import s from './PageWrap.module.scss';

type TPageWrapProps = { children: ReactNode };

const PageWrap = ({ children }: TPageWrapProps) => {
	const wrapRef = useRef<HTMLDivElement | null>(null);
	const location = useLocation();

	useEffect(() => {
		if (wrapRef.current) {
			wrapRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [location]);

	return (
		<div ref={wrapRef} className={s.wrap}>
			<div className='container'>{children}</div>
		</div>
	);
};

export default PageWrap;
