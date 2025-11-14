import { Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import AboutBrand from './pages/AboutBrand/AboutBrand';
import Cart from './pages/Cart';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Shop from './pages/Shop/Shop';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/shop/product/:productId' element={<Product />} />
				<Route path='/about-brand' element={<AboutBrand />} />
				<Route path='/contacts' element={<Contacts />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
