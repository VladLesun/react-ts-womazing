import s from './PageWrap.module.scss';

function PageWrap({ children }) {
	return (
		<div className={s.wrap}>
			<div className='container'>{children}</div>
		</div>
	);
}

export default PageWrap;
