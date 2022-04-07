import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

import './settings.css';

export default function Settings ({ children }) {
	const [ state, setState ] = React.useState(false);
	const toggleDrawer = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState(open);
	};

	return (
		<>
			<div className='settings-open'>
				<Button onClick={toggleDrawer(true)}><SettingsIcon /> Settings</Button>
			</div>
			<Drawer
				anchor={'right'}
				open={state}
				onClose={toggleDrawer(false)}
			>
				<section className="settings-box">
					<Button onClick={toggleDrawer(false)}><CloseIcon /></Button>
					<h2>Settings</h2>
					{ children }
				</section>
			</Drawer>
		</>
	);
}
