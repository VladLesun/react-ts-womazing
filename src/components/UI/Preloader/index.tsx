import s from './Preloader.module.scss';

const Preloader = () => {
	return (
		<div className='container'>
			<div className={s.wrap}>
				<div className={s.preloader}></div>
			</div>
		</div>
	);
};

export default Preloader;
