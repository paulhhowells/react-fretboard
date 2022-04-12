import React from 'react';

import { usePersistence } from '../usePersistence';
import {
	KEY,
	PATTERN_ID,
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

const defaultStyleMode = STYLE_MODE.DIATONIC;
const initialNoteState = {
	keyRoot: KEY.C,
	degree: 0,
	// pattern: STYLE_MODE_OPTIONS[defaultStyleMode].patternOptions[3].pattern,
	patternId: PATTERN_ID.TRIAD,
	styleMode: defaultStyleMode,
};

function noteReducer (state, action) {
	switch (action.type) {
		case ACTION_TYPE.SET_KEY_ROOT:
			const { keyRoot } = action.payload;

			return {
				...state,
				keyRoot,
			};
		case ACTION_TYPE.UPDATE_NOTES:
			return {
				...state,
				notes: action.payload,
			};
		case ACTION_TYPE.SET_PATTERN:
			return {
				...state,
				patternId: action.payload.patternId,
			};
		case ACTION_TYPE.SET_DEGREE:
			return {
				...state,
				degree: action.payload.degree,
			};
		case ACTION_TYPE.SET_STYLE_MODE:
			const { styleMode } = action.payload;
			const { degree, patternId } = state;
			const newState = {
				...state,
				styleMode,
			};
			const { patternOptions, degreeOptions } = STYLE_MODE_OPTIONS[styleMode];

			// Update pattern & degree if current values are not valid options for styleMode.
			// TODO use .some instead of .find ?
			if (patternOptions.find(patternOption => patternOption.patternId === patternId) === undefined) {
				newState.patternId = patternOptions[0].patternId;
			}

			if (degreeOptions.find(degreeOption => degreeOption.degree === degree) === undefined) {
				newState.degree = degreeOptions[0].degree;
			}

			return newState;
		default:
			throw new Error('noteReducer action type not found: ' + JSON.stringify(action));
	}
}

export function useNotes () {
	const {
		currentState,
		dispatch,
	} = usePersistence({
		id: 'notes',
		defaultState: initialNoteState,
		reducer: noteReducer,
	});

	const {
		keyRoot,
		degree,
		patternId,
		styleMode,
	} = currentState;

	const { notes } = React.useMemo(() => deriveNotes({
		keyRoot,
		patternId,
		degreeIndex: degree,
	}), [ keyRoot, patternId, degree ]);

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
		}), [ dispatch ]);

	const setPatternId = React.useCallback(
		patternId => dispatch({
			type: ACTION_TYPE.SET_PATTERN,
			payload: { patternId },
		}), [ dispatch ]);

	const setStyleMode = React.useCallback(
		styleMode => dispatch({
			type: ACTION_TYPE.SET_STYLE_MODE,
			payload: { styleMode },
		}), [ dispatch ]);

	// TODO: rename as setKey ?
	const setKeyRoot = React.useCallback(
		keyRoot => dispatch({
			type: ACTION_TYPE.SET_KEY_ROOT,
			payload: { keyRoot },
		}), [ dispatch ]);

	return {
		degree,
		degreeOptions,
		keyRoot,
		notes,
		patternId,
		patternOptions,
		setDegree,
		setKeyRoot,
		setPatternId,
		setStyleMode,
		styleMode,
	};
}
