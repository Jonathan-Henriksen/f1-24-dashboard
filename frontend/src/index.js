import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Importing the main App component

import './index.css';  // Importing global styles and Tailwind's base components

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
