import { useRef, useState, type ChangeEvent } from 'react';

type TFormValues = Record<string, string>;
type TFormErrors<T extends TFormValues> = Partial<
	Record<keyof T, string | undefined>
>;
type TFormRequiredFields<T extends TFormValues> = Array<keyof T>;
type TElementsRef<T extends TFormValues> = Partial<
	Record<keyof T, HTMLInputElement | HTMLTextAreaElement | null>
>;

export const useValidation = <T extends TFormValues>(
	initialValues: T,
	requiredFields: TFormRequiredFields<T>
) => {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<TFormErrors<T>>({});

	const elementsRef = useRef<TElementsRef<T>>({});

	const getFieldRef =
		(name: keyof T) =>
		(elem: HTMLInputElement | HTMLTextAreaElement | null) => {
			elementsRef.current[name] = elem;
		};

	const validate = () => {
		const newErrors = {} as TFormErrors<T>;

		requiredFields.forEach(field => {
			const raw = values[field] ?? '';
			const value = raw.trim();

			if (!value) {
				newErrors[field] = 'Поле обязательно';
				return;
			}

			if (field === 'email') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					newErrors[field] = 'Введите корректный email';
				}
			}

			if (field === 'phone') {
				const phoneRegex = /^[0-9+()\-\s]{7,}$/;
				if (!phoneRegex.test(value)) {
					newErrors[field] = 'Введите корректный номер телефона';
				}
			}

			if (
				!(['name', 'country', 'city', 'street'] as Array<keyof T>).includes(
					field
				) &&
				value.length < 2
			) {
				newErrors[field] = 'Минимум 2 символа';
			}
		});

		setErrors(newErrors);

		const firstErrorField = Object.keys(newErrors)[0] as keyof T | undefined;
		if (firstErrorField) {
			const elem = elementsRef.current[firstErrorField];
			if (elem) {
				elem.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
				if (typeof elem.focus === 'function') elem.focus();
			}
		}

		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const name = e.target.name as keyof T;
		const value = e.target.value;
		const trimmed = value.trim();

		setValues(prev => ({ ...prev, [name]: value }));

		let error: string | undefined;

		if (requiredFields.includes(name)) {
			if (!trimmed) {
				error = 'Поле обязательно к заполнению';
			} else if (name === 'email') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(trimmed)) {
					error = 'Введите корректный email';
				}
			} else if (name === 'phone') {
				const phoneRegex = /^[0-9+()\-\s]{7,}$/;
				if (!phoneRegex.test(trimmed)) {
					error = 'Введите корректный номер телефона';
				}
			} else if (
				!(['email', 'phone', 'house', 'apartment'] as Array<keyof T>).includes(
					name
				) &&
				trimmed.length < 2
			) {
				error = 'Минимум 2 символа';
			}
		}

		setErrors(prev => ({
			...prev,
			[name]: error || undefined,
		}));
	};

	const handleReset = () => {
		setValues(initialValues);
		setErrors({});
	};

	const getCleanValues = (): Partial<T> =>
		Object.fromEntries(
			Object.entries(values).filter(([, value]) => value !== '')
		) as Partial<T>;

	return {
		values,
		errors,
		getFieldRef,
		validate,
		handleChange,
		handleReset,
		getCleanValues,
	};
};
