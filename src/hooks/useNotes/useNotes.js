import React from 'react';

import {
	KEY,
	KEY_DEFINITION,
	PATTERN,
	STYLE_MODE_OPTIONS,
} from '../../constants';
import { STYLE_MODE } from './constants';
import { deriveNotes } from './scales';

const ACTION_TYPE = Object.freeze({
	SET_DEGREE: 'SET_DEGREE',
	SET_PATTERN: 'SET_PATTERN',
	SET_ROOT_NOTE: 'SET_ROOT_NOTE',
	SET_STYLE_MODE: 'SET_STYLE_MODE',
});

// TODO: save state in local storage
const defaultStyleMode = STYLE_MODE.DIATONIC;
const initialNoteState = {
	keyRoot: KEY.C,
	degree: 0,
	notes: new Map([]),
	// pattern: STYLE_MODE_OPTIONS[defaultStyleMode].patternOptions[3].pattern,
	pattern: PATTERN.TRIAD,
	styleMode: defaultStyleMode,
};

function noteReducer (state, action) {
	switch (action.type) {
		case ACTION_TYPE.SET_KEY_ROOT:
			const { keyRoot } = action.payload;

			return {
				...state,
				keyRoot,
				// should this be derived elsewhere?
				rootNote: KEY_DEFINITION[keyRoot].note,
			};
		case ACTION_TYPE.UPDATE_NOTES:
			return {
				...state,
				notes: action.payload,
			};
		case ACTION_TYPE.SET_PATTERN:
			return {
				...state,
				pattern: action.payload.pattern,
			};
		case ACTION_TYPE.SET_DEGREE:
			return {
				...state,
				degree: action.payload.degree,
			};
		case ACTION_TYPE.SET_STYLE_MODE:
			const { styleMode } = action.payload;
			const { degree, pattern } = state;
			const { patternOptions, degreeOptions } = STYLE_MODE_OPTIONS[styleMode];
			const newState = {
				...state,
				styleMode,
			};

			// Update pattern & degree if current values are not valid options for styleMode.
			// TODO use .some instead of .find ?
			if (patternOptions.find(patternOption => patternOption.pattern === pattern) === undefined) {
				newState.pattern = patternOptions[0].pattern;
			}

			if (degreeOptions.find(degreeOption => degreeOption.degree === degree) === undefined) {
				newState.degree = degreeOptions[0].degree;
			}

			return newState;
		default:
			throw new Error(action);
	}
}

export function useNotes () {
	const [ state, dispatch ] = React.useReducer(noteReducer, initialNoteState);

	const {
		keyRoot,
		degree,
		pattern,
		rootNote,
		styleMode,
	} = state;

	const { notes } = React.useMemo(() => deriveNotes({
		keyRoot,
		pattern,
		degreeIndex: degree,
	}), [ keyRoot, pattern, degree ]);

	const patternOptions = STYLE_MODE_OPTIONS[styleMode].patternOptions;
	const degreeOptions = React.useMemo(
		() => STYLE_MODE_OPTIONS[styleMode].degreeOptions.map(option => ({
			...option,
			intervalLabel: '',
			noteLabel: '',
		})),
		[ styleMode ]
	);

	const setDegree = React.useCallback(
		degree => dispatch({
			type: ACTION_TYPE.SET_DEGREE,
			payload: { degree },
		}), []);

	const setPattern = React.useCallback(
		pattern => dispatch({
			type: ACTION_TYPE.SET_PATTERN,
			payload: { pattern },
		}), []);

	const setStyleMode = React.useCallback(
		styleMode => dispatch({
			type: ACTION_TYPE.SET_STYLE_MODE,
			payload: { styleMode },
		}), []);

	// TODO: rename as setKey ?
	const setKeyRoot = React.useCallback(
		keyRoot => dispatch({
			type: ACTION_TYPE.SET_KEY_ROOT,
			payload: { keyRoot },
		}), []);

	return {
		degree,
		degreeOptions,
		keyRoot,
		notes,
		pattern,
		patternOptions,
		rootNote,
		setDegree,
		setKeyRoot,
		setPattern,
		setStyleMode,
		styleMode,
	};
}
