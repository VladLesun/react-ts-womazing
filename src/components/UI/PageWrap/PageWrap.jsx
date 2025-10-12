import s from './PageWrap.module.scss';

function PageWrap({ children }) {
	return <div className={s.wrap}>{children}</div>;
}

export default PageWrap;
