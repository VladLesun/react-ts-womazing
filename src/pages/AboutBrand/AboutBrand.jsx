import Button from '../../components/UI/Button/Button';
import PageTitleContent from '../../components/UI/PageTitleContent/PageTitleContent';
import PageWrap from '../../components/UI/PageWrap/PageWrap';
import s from './AboutBrand.module.scss';

function AboutBrand() {
	return (
		<PageWrap>
			<div className='container'>
				<PageTitleContent children='О бренде' />
				<div>
					<ul className={s.list}>
						<li className={s.item}>
							<img
								className={s.image}
								src='./img/about-brand/img1.png'
								alt='довольная девушка в джинсах и боди'
							/>
							<div className={s.content}>
								<h2 className={s.subtitle}>Идея и женщина</h2>
								<p className={s.desc}>
									Womazing была основана в 2010-ом и стала одной из самых
									успешных компаний нашей страны. Как и многие итальянские
									фирмы, Womazing остаётся семейной компанией, хотя ни один из
									членов семьи не является модельером.
									<br />
									<br />
									Мы действуем по успешной формуле, прибегая к услугам известных
									модельеров для создания своих коллекций. Этот метод был описан
									критиком моды Колином Макдауэллом как форма дизайнерского
									со-творчества, характерная для ряда итальянских prêt-a-porter
									компаний.
								</p>
							</div>
						</li>
						<li className={s.item}>
							<img
								className={s.image}
								src='./img/about-brand/img2.png'
								alt='девушка в шикарном белом платье'
							/>
							<div className={s.content}>
								<h2 className={s.subtitle}>Магия в деталях</h2>
								<p className={s.desc}>
									Первый магазин Womazing был открыт в маленьком городке на
									севере страны в 2010-ом году. Первая коллекция состояла из
									двух пальто и костюма, которые были копиями парижских моделей.
									<br />
									<br />
									Несмотря на то, что по образованию основательница была
									адвокатом, ее семья всегда была тесно связана с шитьём
									(прабабушка основательницы шила одежду для женщин, а мать
									основала профессиональную школу кроя и шитья). Стремление
									производить одежду для масс несло в себе большие перспективы,
									особенно в то время, когда высокая мода по-прежнему
									доминировала, а рынка качественного prêt-a-porter попросту не
									существовало.
								</p>
							</div>
						</li>
					</ul>

					<Button
						children='Перейти в магазин'
						href='/shop'
						className={s.link}
					/>
				</div>
			</div>
		</PageWrap>
	);
}

export default AboutBrand;
