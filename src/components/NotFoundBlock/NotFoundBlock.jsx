import s from './NotFoundBlock.module.scss';

function NotFoundBlock() {
	return (
		<div className='container'>
			<div className={s.wrap}>
				<h1 className={s.title}>Ничего не найдено...</h1>
				<p className={s.desc}>
					К сожалению данная страница отсутствует в нашем интернет-магазине
				</p>
			</div>
		</div>
	);
}

export default NotFoundBlock;
