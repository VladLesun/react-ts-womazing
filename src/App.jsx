import Collections from './components/Collections/Collections';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Important from './components/Important/Important';
import Team from './components/Team/Team';

function App() {
	return (
		<>
			<Header />

			<h1 className='visually-hidden'>
				Womazing - магазин стильной женской одежды
			</h1>

			<Hero />
			<Collections />
			<Important />
			<Team />

			<Footer />
		</>
	);
}

export default App;
