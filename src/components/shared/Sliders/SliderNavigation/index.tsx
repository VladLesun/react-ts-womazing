import cn from 'classnames';

import s from './SliderNavigation.module.scss';

type TSliderNav = {
	className: string;
	prevBtn: () => void;
	nextBtn: () => void;
};

const SliderNavigation = ({ className, prevBtn, nextBtn }: TSliderNav) => {
	return (
		<div className={className}>
			<button className={cn(s.btn, s.btn_prev)} onClick={prevBtn}>
				<svg
					width='29'
					height='16'
					viewBox='0 0 29 16'
					fill='currentColor'
					stroke='currentColor'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M29 8L0.999999 8M0.999999 8L8.18919 0.999999M0.999999 8L8.18919 15' />
				</svg>
			</button>
			<button className={cn(s.btn, s.btn_next)} onClick={nextBtn}>
				<svg
					width='29'
					height='16'
					viewBox='0 0 29 16'
					fill='currentColor'
					stroke='currentColor'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M8.34742e-08 8L28 8M28 8L20.8108 15M28 8L20.8108 1' />
				</svg>
			</button>
		</div>
	);
};

export default SliderNavigation;
