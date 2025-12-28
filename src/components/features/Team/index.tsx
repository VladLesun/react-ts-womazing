import { Link } from 'react-router-dom';

import TeamSlider from '../UI/Sliders/TeamSlider/TeamSlider';
import s from './Team.module.scss';

const Team = () => {
	return (
		<section className={s.team}>
			<div className='container'>
				<h2 className={s.title}>Команда мечты Womazing</h2>

				<div className={s.wrap}>
					<TeamSlider />
					<div className={s.content}>
						<h3 className={s.subtitle}>Для каждой</h3>
						<p className={s.desc}>
							Каждая девушка уникальна. Однако, мы схожи в миллионе мелочей.
							<br />
							<br />
							Womazing ищет эти мелочи и создает прекрасные вещи, которые
							выгодно подчеркивают достоинства каждой девушки.
						</p>
						<Link className={s.link} to='/about-brand'>
							Подробнее о бренде
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Team;
