import s from './PageTitleContent.module.scss';

function PageTitleContent({ children }) {
	return (
		<div className={s.wrap}>
			<h1 className={s.title}>{children}</h1>
			<ul className={s.list}>
				<li className={s.item}>BC 1</li>
				<li className={s.item}>BC 2</li>
				<li className={s.item}>BC 3</li>
			</ul>
		</div>
	);
}

export default PageTitleContent;
