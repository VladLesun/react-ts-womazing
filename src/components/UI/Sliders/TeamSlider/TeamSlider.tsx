import cn from 'classnames';

import { useActionSliders } from '../../../../hooks/useActionSliders';

import SliderBar from '../SliderBar/SliderBar';
import SliderNavigation from '../SliderNavigation/SliderNavigation';
import s from './TeamSlider.module.scss';

export type TTeamSlidesContent = { imgUrl: string; imgUrlWebP: string };

const slides: TTeamSlidesContent[] = [
	{ imgUrl: './img/team/img1.png', imgUrlWebP: './img/team/img1.webp' },
	{ imgUrl: './img/team/img2.png', imgUrlWebP: './img/team/img2.webp' },
	{ imgUrl: './img/team/img3.png', imgUrlWebP: './img/team/img3.webp' },
];

const TeamSlider = () => {
	const { activeId, setActiveId, next, prev } = useActionSliders(slides);

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
				prevBtn={prev}
				nextBtn={next}
			/>
		</div>
	);
};

export default TeamSlider;
