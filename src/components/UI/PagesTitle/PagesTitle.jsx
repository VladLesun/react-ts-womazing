import s from './PagesTitle.module.scss';

function PagesTitle({ children }) {
	return <h1 className={s.title}>{children}</h1>;
}

export default PagesTitle;
