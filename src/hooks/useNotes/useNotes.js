import React from 'react';

import { KEY_SIGN } from '../../constants';
import { ROOTS, deriveNotes } from './scales';

const ACTION_TYPE = Object.freeze({
	SET_KEY_SIGN: 'SET_KEY_SIGN',
	SET_PATTERN: 'SET_PATTERN',
	SET_ROOT_NOTE: 'SET_ROOT_NOTE',
	UPDATE_NOTES: 'UPDATE_NOTES',
});

export const STYLE = Object.freeze({
	DIATONIC: 'style.diatonic',
	BLUES: 'style.blues',
});

export const STYLE_OPTIONS = Object.freeze({
	DIATONIC: {},
	BLUES: {},
});

export const PATTERN = Object.freeze({
	// diatonic
	DIATONIC: 'scale.diatonic',
	TRIAD: 'diatonic.triad',
	SEVENTH_CHORD: 'diatonic.seventhChord',
	PENTATONIC: 'scale.pentatonic',
	// blues
	DOMINANT_SEVENTH_CHORD: 'pattern.dominantSeventhChord',
	MIXOLYDIAN: 'scale.mixolydian',
	MAJOR_BLUES: 'scale.majorBlues',
	MINOR_BLUES: 'scale.minorBlues',
	DIAD_3_7: 'diatonic.diad.3.7',
	// TODO: how to offer a subset of these options in UI?
	PENTATONIC_1: 'diatonic.pentatonic',
	// PENTATONIC_4: 'diatonic.pentatonic.4',
	// PENTATONIC_5: 'diatonic.pentatonic.5',
});

export const DEGREE = Object.freeze({
	0: 'I',
	1: 'II',
	2: 'III',
	3: 'IV',
	4: 'V',
	5: 'VI',
	6: 'VII',
});

// TODO: replace open string pitches.
export const TUNING = Object.freeze({
	// Notes are listed low to high, then reversed.
	EADGBE: { label: 'Spanish', notes: [ 4, 9, 2, 7, 11, 4 ].reverse() },
	DADGAD: { label: 'DADGAD', notes: [ 2, 9, 2, 7, 9, 2 ].reverse() },
	DADGBD: { label: 'Double Drop D', notes: [ 2, 9, 2, 7, 11, 2 ].reverse() },
});

// TODO: save state in local storage
const initialkeySign = KEY_SIGN.FLAT;
const initialNoteState = {
	keySign: initialkeySign,
	rootNote: 9, // A
	rootNoteChoices: ROOTS[initialkeySign],
	notes: new Map([]),
	style: STYLE.diatonic,
	pattern: PATTERN.DIATONIC,
	tuning: TUNING.EADGBE,
	degree: 0,
};

function noteReducer (state, action) {
	switch (action.type) {
		case ACTION_TYPE.SET_ROOT_NOTE:
			return {
				...state,
				rootNote: action.payload.rootNote,
			};

		case ACTION_TYPE.UPDATE_NOTES:
			return {
				...state,
				notes: action.payload,
			};

		case ACTION_TYPE.SET_PATTERN:
			return {
				...state,
				interval: action.payload.interval,
				pattern: action.payload.pattern,
			};
		case ACTION_TYPE.SET_KEY_SIGN:
			const { keySign } = action.payload;

			return {
				...state,
				keySign,
				rootNoteChoices: ROOTS[keySign],
			};

		default:
			throw new Error(action);
	}
}

export function useNotes () {
	const [ state, dispatch ] = React.useReducer(noteReducer, initialNoteState);

	const {
		notes,
		pattern,
		keySign,
		rootNote,
		rootNoteChoices,
		style,
		tuning,
		degree,
	} = state;
	React.useEffect(() => {
		console.log('useEffect pattern', pattern);

		dispatch({
			type: ACTION_TYPE.UPDATE_NOTES,
			payload: deriveNotes({
				rootNote, // 0 to 11
				pattern,
				degree,

				// TODO: should only toggle enharmonic keys
				keySign, // sharp or flat
			})
		});
	}, [ rootNote, pattern, keySign, degree ]);


	const setRootNote = rootNote => dispatch({
		type: ACTION_TYPE.SET_ROOT_NOTE,
		payload: {
			rootNote,
		},
	});

	const setPattern = pattern => dispatch({
		type: ACTION_TYPE.SET_PATTERN,
		payload: {
			pattern,
			interval,
		}
	});

	const setKeySign = keySign=> {
		dispatch({
			type: ACTION_TYPE.SET_KEY_SIGN,
			payload: {
				keySign,
			}
		});
	};

	return {
		pattern,
		keySign,
		notes,
		rootNote,
		rootNoteChoices,
		style,
		tuning,
		setPattern,
		setKeySign,
		setRootNote,
	};
}
