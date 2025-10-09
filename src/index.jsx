import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
