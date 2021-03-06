import React from 'react';
import ReactDOM from 'react-dom';
// import CssBaseline from '@mui/material/CssBaseline';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		{/* <CssBaseline /> */}
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

console.log(`%c ${process.env.REACT_APP_VERSION} `, 'background: #222; color: #ec0; padding: 0.25em; font-size: 1.25em;');
