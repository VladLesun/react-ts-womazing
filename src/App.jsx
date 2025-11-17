import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { auth } from './API/firebase';
import Layout from './layouts/Layout';
import AboutBrand from './pages/AboutBrand/AboutBrand';
import Cart from './pages/Cart';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Shop from './pages/Shop/Shop';
import { setUser } from './redux/auth/auth.slice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// создаём анонимного пользователя
		signInAnonymously(auth);

		// слушаем изменения авторизации
		const unsub = onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(setUser(user.uid));
			} else {
				dispatch(setUser(null));
			}
		});

		return () => unsub();
	}, [dispatch]);

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
