import ContentLoader from 'react-content-loader';

const OrderSkeleton = () => {
	return (
		<>
			{Array.from({ length: 3 }).map((_, index) => (
				<li key={index}>
					<ContentLoader
						speed={2}
						width='100%'
						height='100%'
						viewBox='0 0 355 28'
						backgroundColor='#f3f3f3'
						foregroundColor='#6e9c9f'
					>
						<rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
					</ContentLoader>
				</li>
			))}
		</>
	);
};

export default OrderSkeleton;
