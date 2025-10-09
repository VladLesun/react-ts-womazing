import cn from 'classnames';
import { useState } from 'react';
import SliderBar from '../SliderBar/SliderBar';
import SliderNavigation from '../SliderNavigation/SliderNavigation';
import s from './TeamSlider.module.scss';

const slides = [
	{ imgUrl: './img/team/img1.png', desc: 'девушки с ножницами' },
	{ imgUrl: './img/team/img2.png', desc: 'девушки смотрят на закате' },
	{ imgUrl: './img/team/img3.png', desc: 'девушки в поле' },
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
					<img className={s.image} src={slide.imgUrl} alt={slide.desc} />
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
