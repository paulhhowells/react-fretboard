import React from 'react';

import { KEY_TYPE } from '../../constants';
import SCALES, { ROOTS } from './scales';

const ACTION_TYPE = Object.freeze({
	SET_KEY_TYPE: 'SET_KEY_TYPE',
	SET_INTERVAL: 'SET_INTERVAL',
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

// TODO: rename
export const INTERVAL = Object.freeze({
	// diatonic
	DIATONIC: 'interval.diatonic',
	TRIAD: 'interval.triad',
	SEVENTH_CHORD: 'interval.seventhChord',
	PENTATONIC: 'interval.pentatonic',
	// blues
	DOMINANT_SEVENTH_CHORD: 'interval.dominantSeventhChord',
	MIXOLYDIAN: 'interval.mixolydian',
	MAJOR_BLUES: 'interval.majorBlues',
	MINOR_BLUES: 'interval.minorBlues',
	DIAD_3_7: 'interval.diad.3.7',
	// TODO: how to offer a subset of these options in UI?
	PENTATONIC_1: 'interval.pentatonic.1',
	PENTATONIC_4: 'interval.pentatonic.4',
	PENTATONIC_5: 'interval.pentatonic.5',
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
const initialKeyType = KEY_TYPE.MAJOR;
const initialNoteState = {
	keyType: initialKeyType,
	rootNote: 9, // A
	rootNoteChoices: ROOTS[initialKeyType],
	notes: new Map([]),
	openStringPitches: [ 4, 9, 2, 7, 11, 4 ].reverse(), // E A D G B E
	style: STYLE.diatonic,
	interval: INTERVAL.diatonic,
	tuning: TUNING.EADGBE,
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

		case ACTION_TYPE.SET_INTERVAL:
			return {
				...state,
				interval: action.payload.interval,
			};
		case ACTION_TYPE.SET_KEY_TYPE:
			const { keyType } = action.payload;

			return {
				...state,
				keyType,
				rootNoteChoices: ROOTS[keyType],
			};

		default:
			throw new Error(action);
	}

}

function deriveNotes (rootNote, interval, keyType, degree = 1) {
	const scale = SCALES[keyType][rootNote];

	// TODO: filter scale by scale degrees / intervals

	const notes = new Map(
		scale.map(({ note, label, sign, degree }) => ([ note, { note, label, sign, degree } ]))
	);

	return notes;
}

export function useNotes () {
	const [ state, dispatch ] = React.useReducer(noteReducer, initialNoteState);

	const {
		notes,
		openStringPitches,
		interval,
		keyType,
		rootNote,
		rootNoteChoices,
		style,
		tuning,
	} = state;
	React.useEffect(() => {
		dispatch({ type: ACTION_TYPE.UPDATE_NOTES, payload: deriveNotes(rootNote, interval, keyType) });
	}, [ rootNote, interval, keyType ]);


	const setRootNote = rootNote => dispatch({
		type: ACTION_TYPE.SET_ROOT_NOTE,
		payload: {
			rootNote,
		},
	});

	const setInterval = interval => dispatch({
		type: ACTION_TYPE.SET_INTERVAL,
		payload: {
			interval,
		}
	});

	const setKeyType = keyType => {
		dispatch({
			type: ACTION_TYPE.SET_KEY_TYPE,
			payload: {
				keyType,
			}
		});
	};
	
	return {
		interval,
		keyType,
		notes,
		openStringPitches,
		rootNote,
		rootNoteChoices,
		style,
		tuning,
		setInterval,
		setKeyType,
		setRootNote,
	};
}
