import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './API/firebase';
import Layout from './layouts/Layout';
import AboutBrand from './pages/AboutBrand/AboutBrand';
import Cart from './pages/Cart';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Shop from './pages/Shop/Shop';
import { setUser } from './redux/auth/auth.slice';
import { setCartRealTime } from './redux/cart/cart.slice';

function App() {
	const dispatch = useDispatch();

	const userId = useSelector(state => state.auth.userId);

	useEffect(() => {
		// создаём анонимного пользователя
		signInAnonymously(auth);

		// слушаем изменения авторизации
		const unsubAuth = onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(setUser(user.uid));
			} else {
				dispatch(setUser(null));
			}
		});

		return () => unsubAuth();
	}, [dispatch]);

	useEffect(() => {
		if (!userId) return;

		const cartRef = collection(doc(db, 'users', userId), 'cart');
		const unsubCart = onSnapshot(cartRef, snapshot => {
			const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			console.log('items: ', items);
			dispatch(setCartRealTime(items));

			return () => unsubCart;
		});
	}, [dispatch, userId]);

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
