import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import 'leaflet/dist/leaflet.css';
import { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { auth, db } from './API/firebase';

import type { TCartItem } from './redux';
import { selectUserId, setCartRealTime, setUser } from './redux';

import { useAppDispatch } from './redux/redux.types';

import { Preloader } from './components';
import Layout from './layouts/Layout';
import Home from './pages/Home';

const AboutBrand = lazy(() => import('./pages/AboutBrand/AboutBrand'));
const Cart = lazy(() => import('./pages/Cart'));
const Contacts = lazy(() => import('./pages/Contacts'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Order = lazy(() => import('./pages/Order'));
const OrderConfirmed = lazy(
	() => import('./pages/OrderConfirmed/OrderConfirmed')
);
const Product = lazy(() => import('./pages/Product'));
const Shop = lazy(() => import('./pages/Shop/Shop'));

const App = () => {
	const dispatch = useAppDispatch();

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
				<Route
					path='/shop'
					element={
						<Suspense fallback={<Preloader />}>
							<Shop />
						</Suspense>
					}
				/>
				<Route
					path='/shop/:productId'
					element={
						<Suspense fallback={<Preloader />}>
							<Product />
						</Suspense>
					}
				/>
				<Route
					path='/about-brand'
					element={
						<Suspense fallback={<Preloader />}>
							<AboutBrand />
						</Suspense>
					}
				/>
				<Route
					path='/contacts'
					element={
						<Suspense fallback={<Preloader />}>
							<Contacts />
						</Suspense>
					}
				/>
				<Route
					path='/cart'
					element={
						<Suspense fallback={<Preloader />}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path='/order'
					element={
						<Suspense fallback={<Preloader />}>
							<Order />
						</Suspense>
					}
				/>
				<Route
					path='/confirmed'
					element={
						<Suspense fallback={<Preloader />}>
							<OrderConfirmed />
						</Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<Suspense fallback={<Preloader />}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
};

export default App;
