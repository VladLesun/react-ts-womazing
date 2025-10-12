import cn from 'classnames';
import { useState } from 'react';
import Button from '../Button/Button';
import s from './ShopPagination.module.scss';

const countPages = [1, 2, 3, 4, 5, 6, 7, 8];

function ShopPagination({ className }) {
	const [activePage, setActivePage] = useState(0);

	return (
		<ul className={s.list}>
			{activePage === countPages.length - 1 && (
				<li>
					<button
						onClick={() => setActivePage(0)}
						className={cn(s.arrow, s.arrow_left)}
						aria-label='Перейти на последнюю страницу с товарами'
					>
						<svg
							width='21'
							height='11'
							viewBox='0 0 21 11'
							stroke='currentColor'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M-2.18557e-07 5.5L20 5.5M20 5.5L14.8649 10.5M20 5.5L14.8649 0.499999' />
						</svg>
					</button>
				</li>
			)}
			{countPages?.map((page, index) => (
				<li key={page}>
					<Button
						className={activePage === index ? className : ''}
						onClick={() => setActivePage(index)}
						children={page}
						variant='pagination'
					/>
				</li>
			))}
			{activePage === 0 && (
				<li>
					<button
						onClick={() => setActivePage(countPages.length - 1)}
						className={s.arrow}
						aria-label='Перейти на первую страницу с товарами'
					>
						<svg
							width='21'
							height='11'
							viewBox='0 0 21 11'
							stroke='currentColor'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M-2.18557e-07 5.5L20 5.5M20 5.5L14.8649 10.5M20 5.5L14.8649 0.499999' />
						</svg>
					</button>
				</li>
			)}
		</ul>
	);
}

export default ShopPagination;
