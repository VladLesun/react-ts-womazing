import { createContext, useContext, useState } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
	const [activeCategory, setActiveCategory] = useState('all');
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [isError, setIsError] = useState(null);

	return (
		<ProductsContext.Provider
			value={{
				products,
				setProducts,
				isLoading,
				setIsLoading,
				isError,
				activeCategory,
				setActiveCategory,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export const useProducts = () => useContext(ProductsContext);
