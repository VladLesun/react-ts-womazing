import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { auth, db } from './API/firebase';

import { selectUserId } from './redux/auth/auth.select';
import { setUser } from './redux/auth/auth.slice';
import { setCartRealTime, type TCartItem } from './redux/cart/cart.slice';

import Layout from './layouts/Layout';
import AboutBrand from './pages/AboutBrand/AboutBrand';
import Cart from './pages/Cart';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Order from './pages/Order';
import OrderConfirmed from './pages/OrderConfirmed/OrderConfirmed';
import Product from './pages/Product';
import Shop from './pages/Shop/Shop';
import type { AppDispatch } from './redux/store';

const App = () => {
	const dispatch = useDispatch<AppDispatch>();

	const userId = useSelector(selectUserId);

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
			const items = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			})) as TCartItem[];
			dispatch(setCartRealTime(items));
		});

		return () => unsubCart();
	}, [dispatch, userId]);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/shop/:productId' element={<Product />} />
				<Route path='/about-brand' element={<AboutBrand />} />
				<Route path='/contacts' element={<Contacts />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/order' element={<Order />} />
				<Route path='/confirmed' element={<OrderConfirmed />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
