import { ImportantItem } from '../../../components';
import s from './Important.module.scss';
import type { TImportant } from './Important.types';

const importantItems: TImportant[] = [
	{
		imgUrl: './img/important/quality.png',
		title: 'Качество',
		desc: 'Наши профессионалы работают на лучшем оборудовании для пошива одежды беспрецедентного качества',
	},
	{
		imgUrl: './img/important/speed.png',
		title: 'Скорость',
		desc: 'Благодаря отлаженной системе в Womazing мы можем отшивать до 20-ти единиц продукции в наших собственных цехах',
	},
	{
		imgUrl: './img/important/hand.png',
		title: 'Ответственность',
		desc: 'Мы заботимся о людях и планете. Безотходное производство и комфортные условия труда - все это Womazing',
	},
];

const Important = () => {
	return (
		<section className={s.important}>
			<div className='container'>
				<h2 className={s.title}>Что для нас важно</h2>

				<ul className={s.list}>
					{importantItems.map(item => (
						<ImportantItem
							key={item.title}
							imgUrl={item.imgUrl}
							title={item.title}
							desc={item.desc}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Important;
