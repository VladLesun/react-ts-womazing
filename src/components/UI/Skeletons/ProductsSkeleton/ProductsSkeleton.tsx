import ContentLoader from 'react-content-loader';
import s from './ProductsSkeleton.module.scss';

const ProductsSkeleton = ({ count = 6 }) => {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<li key={index} className={s.item}>
					<ContentLoader
						speed={2}
						width='100%'
						height='100%'
						viewBox='0 0 350 558'
						backgroundColor='#f3f3f3'
						foregroundColor='#6e9c9f'
					>
						<rect x='0' y='0' rx='0' ry='0' width='100%' height='80%' />
						<rect
							x='calc(50% - 72px)'
							y='calc(80% + 20px)'
							rx='0'
							ry='0'
							width='145'
							height='28'
						/>
						<rect
							x='calc(50% - 40px)'
							y='calc(90% + 10px)'
							rx='0'
							ry='0'
							width='80'
							height='21'
						/>
					</ContentLoader>
				</li>
			))}
		</>
	);
};

export default ProductsSkeleton;
