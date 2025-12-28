import { HeroSlider } from '../../../components';
import s from './Hero.module.scss';

type THeroProp = { onClick: () => void };

const Hero = ({ onClick }: THeroProp) => {
	return (
		<section className={s.hero}>
			<div className='container'>
				<HeroSlider onClick={onClick} />
			</div>

			<div className={s.imagesWrap}>
				<div className={s.images}>
					<picture>
						<source srcSet='./img/hero/img-large.webp' type='image/webp' />
						<img className={s.largeImg} src='./img/hero/img-large.jpg' alt='' />
					</picture>
					<picture>
						<source srcSet='./img/hero/img-left.webp' type='image/webp' />
						<img className={s.leftImg} src='./img/hero/img-left.jpg' alt='' />
					</picture>
					<picture>
						<source srcSet='./img/hero/img-right.webp' type='image/webp' />
						<img className={s.rightImg} src='./img/hero/img-right.jpg' alt='' />
					</picture>
				</div>
			</div>
		</section>
	);
};

export default Hero;
