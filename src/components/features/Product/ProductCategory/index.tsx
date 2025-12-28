import { useSelector } from 'react-redux';

import { Button } from '../../../../components';
import {
	selectCategoriesArray,
	selectCategory,
} from '../../../../redux/filter/filter.select';
import {
	setCategory,
	type TFilterCategory,
} from '../../../../redux/filter/filter.slice';
import { useAppDispatch } from '../../../../redux/store';
import type { TProductCategoryProps } from '../product.types';
import s from './ProductCategory.module.scss';

const ProductCategory = ({ setVisibleCount }: TProductCategoryProps) => {
	const dispatch = useAppDispatch();
	const categoryObj = useSelector(selectCategory);
	const categoriesArray = useSelector(selectCategoriesArray);

	const handleSetCategory = (category: TFilterCategory) => {
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
