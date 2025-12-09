import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { store } from './redux/store.js';
import './styles/index.scss';

const root = createRoot(document.getElementById('root')!);

root.render(
	<BrowserRouter>
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>
	</BrowserRouter>
);
