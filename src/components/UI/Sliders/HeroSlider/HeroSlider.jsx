import cn from 'classnames';
import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import SliderBar from '../SliderBar/SliderBar';
import s from './HeroSlider.module.scss';

const slides = [
	{
		title: 'Новые поступления в этом сезоне',
		desc: 'Утонченные сочетания и бархатные оттенки - вот то, что вы искали в этом сезоне. Время исследовать.',
	},
	{
		title: 'Что-то новенькое. Мы заждались тебя.',
		desc: 'Надоело искать себя в сером городе? Настало время новых идей, свежих красок и вдохновения с Womazing!',
	},
	{
		title: 'Включай новый сезон с WOMAZING',
		desc: 'Мы обновили ассортимент - легендарные коллекции и новинки от отечественных дизайнеров',
	},
];

function HeroSlider({ onClick }) {
	const [activeId, setActiveId] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveId(prev => (prev + 1) % slides.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);
	return (
		<div className={s.slider}>
			{slides?.map((slide, index) => (
				<div
					key={index}
					className={cn(s.slide, { [s.slide_active]: index === activeId })}
				>
					<h2 className={s.title}>{slide.title}</h2>
					<p className={s.desc}>{slide.desc}</p>
				</div>
			))}

			<div className={s.actions}>
				<button onClick={onClick} className={s.anchor}>
					<svg
						width='67'
						height='68'
						viewBox='0 0 67 68'
						fill='currentColor'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect
							width='67'
							height='67'
							transform='translate(0 0.5)'
							fillOpacity='0.1'
						/>
						<path
							d='M33 20V48M33 48L26 40.8108M33 48L40 40.8108'
							stroke='#6E9C9F'
						/>
					</svg>
				</button>
				<Button children='Открыть магазин' href='/shop' className={s.link} />
			</div>

			<SliderBar
				className={s.btns}
				slides={slides}
				activeId={activeId}
				onSelect={setActiveId}
			/>
		</div>
	);
}

export default HeroSlider;
