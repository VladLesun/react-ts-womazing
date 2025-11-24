import { useRef, useState } from 'react';

export const useValidation = (initialValues, requiredFields) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const refs = Object.keys(initialValues).reduce((acc, key) => {
		acc[key] = useRef(null);
		return acc;
	}, {});

	const validate = () => {
		const newErrors = {};

		requiredFields.forEach(field => {
			const value = values[field]?.trim();

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
				!['name', 'country', 'city', 'street'].includes(field) &&
				value.length < 2
			) {
				newErrors[field] = 'Минимум 2 символа';
			}
		});

		setErrors(newErrors);

		const firstErrorField = Object.keys(newErrors)[0];
		if (firstErrorField && refs[firstErrorField].current) {
			refs[firstErrorField].current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
			refs[firstErrorField].current.focus();
		}

		return Object.keys(newErrors).length === 0;
	};

	const handleChange = e => {
		const { name, value } = e.target;
		const trimmed = value.trim();

		setValues(prev => ({ ...prev, [name]: value }));

		let error = '';

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
				!['email', 'phone', 'house', 'apartment'].includes(name) &&
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

	const getCleanValues = () =>
		Object.fromEntries(
			Object.entries(values).filter(([_, value]) => value !== '')
		);

	return {
		values,
		errors,
		refs,
		validate,
		handleChange,
		handleReset,
		getCleanValues,
	};
};
