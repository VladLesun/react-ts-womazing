import { collection, getDocs, query } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../API/fireBase';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(null);

	useEffect(() => {
		setIsLoading(true);

		const fetchCategories = async () => {
			try {
				const qCategories = query(collection(db, 'categories'));
				const snapshot = await getDocs(qCategories);

				const categories = snapshot.docs.map(doc => ({
					id: doc.id,
					name: doc.data().name,
				}));

				setCategories(categories);
			} catch (error) {
				console.error('Ошибка получения категорий...', error);
				setIsError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, []);

	return (
		<CategoriesContext.Provider value={{ categories }}>
			{children}
		</CategoriesContext.Provider>
	);
};

export const useCategories = () => useContext(CategoriesContext);
