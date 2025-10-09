import HeroSlider from '../UI/Sliders/HeroSlider/HeroSlider';
import s from './Hero.module.scss';

function Hero() {
	return (
		<section className={s.hero}>
			<div className='container'>
				<HeroSlider />
			</div>

			<div className={s.imagesWrap}>
				<div className={s.images}>
					<img src='./img/hero/img-large.png' className={s.largeImg} />
					<img src='./img/hero/img-left.png' className={s.leftImg} />
					<img src='./img/hero/img-right.png' className={s.rightImg} />
				</div>
			</div>
		</section>
	);
}

export default Hero;
