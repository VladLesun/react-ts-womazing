import HeroSlider from '../UI/Sliders/HeroSlider/HeroSlider';
import s from './Hero.module.scss';

function Hero({ onClick }) {
	return (
		<section className={s.hero}>
			<div className='container'>
				<HeroSlider onClick={onClick} />
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
