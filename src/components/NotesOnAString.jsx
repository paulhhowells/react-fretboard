import React from 'react';
import Note from './Note';

const OCTAVE = 12;

export default function NotesOnAString ({
	calculateFretX,
	nut,
	notes,
	numberOfFrets,
	offsetY = 0,
	noteLabelling,
}) {
	const [ string, setString ] = React.useState([]);

	// TODO refactor, replace useEffect as no side effects!
	React.useEffect(
		() => {
			// List all of the available frets:
			const frets = Array(numberOfFrets).fill({});

			// Map through each fret:
			const string = frets
				.map( // Derive note at each fret:
					(_, position) => ({
						note: (nut + position) % OCTAVE,
						position,
						x: calculateFretX(position),
					})
				)
				.filter( // List only the notes on the string:
					fret => notes.has(fret.note)
				)
				.map( // Add label & sign to each note:
					fret => ({
						...fret,
						...notes.get(fret.note),
					})
				);

			setString(string);
		},
		[ nut, notes, numberOfFrets, calculateFretX ]
	);

	return (
		<g transform={`translate(0 ${ offsetY })`}>
			{
				string.map(note => (<Note
					note={note}
					key={note.noteLabel + note.position}
					noteLabelling={noteLabelling}
				/>))
			}
		</g>
	);
}
