import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Collections from '../components/Collections/Collections';
import Hero from '../components/Hero/Hero';
import Important from '../components/Important/Important';
import Team from '../components/Team/Team';

function Home() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top, behavior: 'smooth' });
	}, [pathname]);
	return (
		<>
			<h1 className='visually-hidden'>
				Womazing - магазин стильной женской одежды
			</h1>

			<Hero />
			<Collections />
			<Important />
			<Team />
		</>
	);
}

export default Home;
