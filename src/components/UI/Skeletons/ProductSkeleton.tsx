import ContentLoader from 'react-content-loader';

const ProductSkeleton = () => {
	if (window.innerWidth < 761) {
		return (
			<ContentLoader
				speed={2}
				width='100%'
				height='100%'
				viewBox='0 0 730 1400'
				backgroundColor='#f3f3f3'
				foregroundColor='#6e9c9f'
			>
				<rect x='0' y='0' rx='0' ry='0' width='200' height='30' />
				<rect x='0' y='55' rx='0' ry='0' width='250' height='20' />
				<rect
					x='calc(50% - 268px)'
					y='180'
					rx='0'
					ry='0'
					width='536'
					height='715'
				/>
				<rect
					x='calc(50% - 140px)'
					y='930'
					rx='0'
					ry='0'
					width='280'
					height='45'
				/>
				<rect
					x='calc(50% - 140px)'
					y='1005'
					rx='0'
					ry='0'
					width='280'
					height='105'
				/>
				<rect
					x='calc(50% - 140px)'
					y='1140'
					rx='0'
					ry='0'
					width='280'
					height='105'
				/>
				<rect
					x='calc(50% - 140px)'
					y='1275'
					rx='0'
					ry='0'
					width='280'
					height='70'
				/>
			</ContentLoader>
		);
	}

	return (
		<ContentLoader
			speed={2}
			width='100%'
			height='100%'
			viewBox='0 0 1110 1400'
			backgroundColor='#f3f3f3'
			foregroundColor='#6e9c9f'
		>
			<rect x='0' y='0' rx='0' ry='0' width='400' height='50' />
			<rect x='0' y='75' rx='0' ry='0' width='200' height='20' />
			<rect x='0' y='220' rx='0' ry='0' width='536' height='715' />
			<rect x='610' y='310' rx='0' ry='0' width='280' height='45' />
			<rect x='610' y='415' rx='0' ry='0' width='280' height='105' />
			<rect x='610' y='580' rx='0' ry='0' width='280' height='105' />
			<rect x='610' y='745' rx='0' ry='0' width='280' height='70' />
		</ContentLoader>
	);
};

export default ProductSkeleton;
