import type { TImpItems } from '../Important';
import s from './ImportantItem.module.scss';

const ImportantItem = ({ imgUrl, title, desc }: TImpItems) => {
	return (
		<li key={title}>
			<article className={s.article}>
				<img className={s.image} src={imgUrl} alt={title} />
				<h3 className={s.title}>{title}</h3>
				<p className={s.desc}>{desc}</p>
			</article>
		</li>
	);
};

export default ImportantItem;
