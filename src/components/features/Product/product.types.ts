export type TProductCardProps = {
	id: string;
	imgUrl: string;
	name: string;
	price: number;
	sale?: number;
};

export type TProductCartProps = {
	id: string;
	imgUrl: string;
	name: string;
	size: string;
	color: string;
	price: number;
	quantity: number;
};

export type TProductCategoryProps = {
	setVisibleCount: (count: number) => void;
};

type TProducts = {
	id: string;
	imgUrl: string;
	name: string;
	price: number;
	sale?: number;
};

export type TProductRelated = { products: TProducts[] };
