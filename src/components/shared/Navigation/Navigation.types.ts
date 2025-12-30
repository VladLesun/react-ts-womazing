type TNavigationVariant = 'burger' | '';

export type TNavigation = {
	isOpenBurger?: boolean;
	className: string;
	onClick?: () => void;
	variant?: TNavigationVariant;
};

type TLinkHref = '/' | '/shop' | '/about-brand' | '/contacts';
type TLinkTitle = 'Главная' | 'Магазин' | 'О бренде' | 'Контакты';

export type TCategory = { href: TLinkHref; title: TLinkTitle };
