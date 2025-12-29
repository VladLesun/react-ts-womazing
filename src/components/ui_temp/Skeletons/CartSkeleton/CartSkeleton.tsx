import ContentLoader from 'react-content-loader';

import s from './CartSkeleton.module.scss';

const CartSkeleton = () => {
	return (
		<>
			{Array.from({ length: 3 }).map((_, index) => (
				<tr key={index} className={s.wrap}>
					<td colSpan={4}>
						<ContentLoader
							speed={2}
							width='100%'
							height='100%'
							viewBox='0 0 1110 280'
							backgroundColor='#f3f3f3'
							foregroundColor='#6e9c9f'
						>
							<rect
								x='10'
								y='calc(50% - 6px)'
								rx='0'
								ry='0'
								width='12'
								height='12'
							/>
							<rect
								x='60'
								y='calc(50% - 90px)'
								rx='0'
								ry='0'
								width='125'
								height='180'
							/>
							<rect x='205' y='80' rx='0' ry='0' width='160' height='20' />
							<rect x='205' y='120' rx='0' ry='0' width='160' height='20' />
							<rect x='205' y='160' rx='0' ry='0' width='160' height='20' />
							<rect
								x='688'
								y='calc(50% - 12px)'
								rx='0'
								ry='0'
								width='40'
								height='24'
							/>
							<rect
								x='805'
								y='calc(50% - 24px)'
								rx='0'
								ry='0'
								width='48'
								height='48'
							/>

							<rect
								x='1010'
								y='calc(50% - 12px)'
								rx='0'
								ry='0'
								width='40'
								height='24'
							/>
						</ContentLoader>
					</td>
				</tr>
			))}
		</>
	);
};

export default CartSkeleton;
