import Collections from '../components/Collections/Collections';
import Hero from '../components/Hero/Hero';
import Important from '../components/Important/Important';
import Team from '../components/Team/Team';

function Home({collectionProducts}) {
	return (
		<>
			<h1 className='visually-hidden'>
				Womazing - магазин стильной женской одежды
			</h1>

			<Hero />
			<Collections products={collectionProducts} />
			<Important />
			<Team />
		</>
	);
}

export default Home;
