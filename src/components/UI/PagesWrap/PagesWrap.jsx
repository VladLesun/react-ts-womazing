import s from './PagesWrap.module.scss';

function PagesWrap({ children }) {
	return <div className={s.wrap}>{children}</div>;
}

export default PagesWrap;
