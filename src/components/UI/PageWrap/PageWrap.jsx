import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import s from './PageWrap.module.scss';

function PageWrap({ children }) {
	const wrapRef = useRef();
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
}

export default PageWrap;
