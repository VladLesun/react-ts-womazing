import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AboutBrand from './pages/AboutBrand/AboutBrand';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Shop from './pages/Shop/Shop';

import { db } from './API/fireBase';
import img1 from './assets/img/products/img1.png';
import img2 from './assets/img/products/img2.png';
import img3 from './assets/img/products/img3.png';
import Contacts from './pages/Contacts';

const collectionItems = [
	{
		id: 1,
		imgUrl: img1,
		title: 'Футболка USA',
		price: 229,
		sale: 129,
		color: ['red', 'black', 'gray'],
		size: ['XS', 'S', 'M', 'L'],
	},
	{
		id: 2,
		imgUrl: img2,
		title: 'Купальник Glow',
		price: 129,
		color: ['red', 'black', 'yellow'],
		size: ['S', 'M', 'L', 'XL'],
	},
	{
		id: 3,
		imgUrl: img3,
		title: 'Свитшот Sweet Shot',
		price: 129,
		color: ['red', 'black', 'pink'],
		size: ['S', 'M', 'L', 'XL', '2XL'],
	},
];

function App() {
	const [collectionProducts, setCollectionProducts] = useState(null);
	useEffect(() => {
		(async () => {
			const qProducts = query(collection(db, 'products'));
			const snapshot = await getDocs(qProducts);

			const products = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));

			setCollectionProducts(products);
		})();
	}, []);

	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<Home collectionProducts={collectionProducts} />} />
					<Route
						path='/shop'
						element={<Shop collectionProducts={collectionProducts} />}
					/>
					<Route
						path='/shop/product/:id'
						element={<Product collectionProducts={collectionProducts} />}
					/>
					<Route path='/about-brand' element={<AboutBrand />} />
					<Route path='/contacts' element={<Contacts />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
