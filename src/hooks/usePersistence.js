import React from 'react';

const APP_NAME = process.env.REACT_APP_NAME;

export const usePersistence = ({ id, userName, defaultState = {} }) => {
	const persistenceNamespace = APP_NAME
		+ ((userName) ? '.' + userName : '')
		+ ((id) ? '.' + id : '');

	const initState = () => {
		// const defaultState = {};
		const state = localStorage.getItem(persistenceNamespace);
		const initialState = (state !== null && state !== undefined)
			? JSON.parse(state)
			: defaultState;
		return initialState;
	};

	const { current: persistedState } = React.useRef(initState());

	const [ currentState, dispatch ] = React.useReducer(
		function reducer (state, action) {
			const { key, value } = action;

			if (key !== undefined && value !== undefined) {
				const newState = {
					...state,
					[key]: value,
				};

				return newState;
			}

			return state;
		},
		persistedState,
	);

	const currentStateString = JSON.stringify(currentState);

	React.useEffect(
		() => {
			localStorage.setItem(persistenceNamespace, currentStateString);
		},
		[ currentStateString, persistenceNamespace ]
	);

	const persistState = React.useCallback((key, value) => dispatch({ key, value }), []);

	return { persistedState, persistState, currentState };
};
