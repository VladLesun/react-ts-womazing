import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Collections, Hero, Important, Team } from '../components';

const Home = () => {
	const { pathname } = useLocation();
	const collectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pathname]);

	const handleScrollToCollection = () => {
		if (collectionRef.current) {
			collectionRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<h1 className='visually-hidden'>
				Womazing - магазин стильной женской одежды
			</h1>

			<Hero onClick={handleScrollToCollection} />
			<Collections ref={collectionRef} />
			<Important />
			<Team />
		</>
	);
};

export default Home;
