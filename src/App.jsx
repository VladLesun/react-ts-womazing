import { Route, Routes } from 'react-router';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AboutBrand from './pages/AboutBrand/AboutBrand';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product/Product';
import Shop from './pages/Shop/Shop';

function App() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/shop' element={<Shop />} />
					<Route path='/shop/product/:id' element={<Product />} />
					<Route path='/about-brand' element={<AboutBrand />} />
					{/* <Route path='/contacts' element={<Contacts />} /> */}
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
