import { useDispatch, useSelector } from 'react-redux';
import {
	selectCategoriesArray,
	selectCategory,
} from '../../../redux/filter/filter.select';
import { setCategory } from '../../../redux/filter/filter.slice';
import Button from '../../UI/Button/Button';
import s from './ProductCategory.module.scss';

function ProductCategory() {
	const dispatch = useDispatch();
	const categoryObj = useSelector(selectCategory);
	const categoriesArray = useSelector(selectCategoriesArray);

	return (
		<ul className={s.categories}>
			{categoriesArray.map(category => (
				<Button
					key={category.id}
					children={category.name}
					onClick={() => dispatch(setCategory(category))}
					className={categoryObj.id === category.id ? s._active : ''}
					variant='category'
				/>
			))}
		</ul>
	);
}

export default ProductCategory;
