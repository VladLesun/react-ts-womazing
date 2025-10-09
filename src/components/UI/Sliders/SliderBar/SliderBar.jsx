import cn from 'classnames';
import s from './SliderBar.module.scss';

// interface SliderBarProps {
//   className?: string;
//   slides: { src: string; alt: string }[];
//   activeId: number;
//   onSelect: (id: number) => void;
// }

function SliderBar({ className, slides, activeId, onSelect }) {
	return (
		<div className={cn(s.btns, className)}>
			{slides?.map((_, index) => (
				<button
					key={index}
					className={cn(s.btn, { [s.btn_active]: index === activeId })}
					onClick={() => onSelect(index)}
				></button>
			))}
		</div>
	);
}

export default SliderBar;
