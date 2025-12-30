type TFilterCategoryId = 'all' | 'coat' | 'sweatshirt' | 'cardigan' | 'hoodie';
type TFilterCategoryName =
	| 'Все'
	| 'Пальто'
	| 'Свитшоты'
	| 'Кардиганы'
	| 'Толстовки';

export type TFilterCategory = {
	id: TFilterCategoryId;
	name: TFilterCategoryName;
};

type TFilterCategories = TFilterCategory[];

export interface IFilterState {
	category: TFilterCategory;
	categories: TFilterCategories;
}
