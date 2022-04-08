import React from 'react';
import { useSettings } from '../hooks/useSettings';

const SettingsContext = React.createContext();

function SettingsProvider ({ children }) {
	const settings = useSettings();

	return (
		<SettingsContext.Provider value={settings}>
			{ children }
		</SettingsContext.Provider>
	);
}

function useSettingsContext () {
	const context = React.useContext(SettingsContext);

	if (context === undefined) {
		throw new Error('useSettingsContext must be used within a SettingsProvider');
	}

	return context;
}

export { SettingsProvider, useSettingsContext };
