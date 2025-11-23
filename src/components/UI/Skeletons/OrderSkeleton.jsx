import ContentLoader from 'react-content-loader';

function OrderSkeleton() {
	return (
		<>
			{Array(3)
				.fill()
				.map((_, index) => (
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
}

export default OrderSkeleton;
