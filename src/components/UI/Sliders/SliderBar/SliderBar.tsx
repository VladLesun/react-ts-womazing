import cn from 'classnames';
import s from './SliderBar.module.scss';

type TSliderBarProps<T = unknown> = {
	className?: string;
	slides: T[];
	activeId: number;
	onSelect: (id: number) => void;
};

const SliderBar = ({
	className,
	slides,
	activeId,
	onSelect,
}: TSliderBarProps) => {
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
};

export default SliderBar;
