import cn from 'classnames';
import { useState } from 'react';
import SliderBar from '../SliderBar/SliderBar';
import SliderNavigation from '../SliderNavigation/SliderNavigation';
import s from './TeamSlider.module.scss';

const slides = [
	{ imgUrl: './img/team/img1.png', imgUrlWebP: './img/team/img1.webp' },
	{ imgUrl: './img/team/img2.png', imgUrlWebP: './img/team/img2.webp' },
	{ imgUrl: './img/team/img3.png', imgUrlWebP: './img/team/img3.webp' },
];

function TeamSlider() {
	const [activeId, setActiveId] = useState(0);

	const getNextId = () => {
		return activeId === slides.length - 1 ? 0 : activeId + 1;
	};
	const getPrevId = () => {
		return activeId === 0 ? slides.length - 1 : activeId - 1;
	};

	return (
		<div className={s.slider}>
			{slides.map((slide, index) => (
				<div
					key={index}
					className={cn(s.slide, { [s.slide_active]: index === activeId })}
				>
					<picture>
						<source srcSet={slide.imgUrlWebP} type='image/webp' />
						<img className={s.image} src={slide.imgUrl} alt='' />
					</picture>
				</div>
			))}

			<SliderBar
				className={s.sliderBar}
				slides={slides}
				activeId={activeId}
				onSelect={setActiveId}
			/>

			<SliderNavigation
				className={s.sliderNavigation}
				prevBtn={() => setActiveId(getPrevId())}
				nextBtn={() => setActiveId(getNextId)}
			/>
		</div>
	);
}

export default TeamSlider;
