import { useDispatch, useSelector } from 'react-redux';

import {
	selectCategoriesArray,
	selectCategory,
} from '../../../redux/filter/filter.select';
import { setCategory } from '../../../redux/filter/filter.slice';

import Button from '../../UI/Button/Button';
import s from './ProductCategory.module.scss';

type TProductCategoryProps = { setVisibleCount: (count: number) => void };

const ProductCategory = ({ setVisibleCount }: TProductCategoryProps) => {
	const dispatch = useDispatch();
	const categoryObj = useSelector(selectCategory);
	const categoriesArray = useSelector(selectCategoriesArray);

	const handleSetCategory = (category: string) => {
		dispatch(setCategory(category));
		setVisibleCount(6);
	};

	return (
		<ul className={s.categories}>
			{categoriesArray.map(category => (
				<Button
					key={category.id}
					children={category.name}
					onClick={() => handleSetCategory(category)}
					className={categoryObj.id === category.id ? s._active : ''}
					variant='category'
				/>
			))}
		</ul>
	);
};

export default ProductCategory;
