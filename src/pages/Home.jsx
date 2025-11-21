import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Collections from '../components/Collections/Collections';
import Hero from '../components/Hero/Hero';
import Important from '../components/Important/Important';
import Team from '../components/Team/Team';

function Home() {
	const { pathname } = useLocation();
	const collectionRef = useRef();

	useEffect(() => {
		window.scrollTo({ top, behavior: 'smooth' });
	}, [pathname]);

	const handleScrollToCollection = () => {
		collectionRef.current.scrollIntoView({ behavior: 'smooth' });
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
}

export default Home;
