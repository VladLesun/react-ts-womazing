import type { TImportant } from '../Important.types';

import s from './ImportantItem.module.scss';

const ImportantItem = ({ imgUrl, title, desc }: TImportant) => {
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
