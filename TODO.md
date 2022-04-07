# TO DO

## Features
* [x] note types for styling, e.g. passing b5
* [x] option to show notes as intervals / scale degrees
* [ ] layers, e.g. scale layer over chord layer, or shadow chord layer over scale
* [x] settings view
* [x] add setting > select tuning
* [x] pale notes at nut
* summary text
* make design responsive, e.g. fretboard width
* string muting
* connector layer, interval lines, e.g. for parallel 6ths
* string nut position for banjo - specify fret in tuning
* add Dorian mode
* piano roll - set changes through time
	* bpm / speed / bars
	* number of bars 4, 8, 12, 16, custom
	* 808 drum machine UI ?
	* for each bar set mode & scale type
		* thus chord changes and scale changes possible
* sound: play root notes? midi?
* sync changes to an audio file?
* [x] roll fretboard edges (reduce edge to string distance)

## Fix
* [x] mixolydian flat notes - improve use of flats & sharps
* [x] diatonic degrees
* [x] fix font size in note
* [ ] font for sharp & flat spacing

## Refactor
* context
* CSS
* constants
* ensure state does not trigger multiple renders
* think about enums
* combine context with state hooks
* select menu for key

## Legacy ideas
Key Chooser
Vanilla / Blues - Mode Chooser
Nashville / Alphabetical - Chooser
Tuning chooser - spanish / Eb / dadgad / dadgbd / mandolin / E9 (with pedals) / C6 / banjo 5th string & ties?
String muting
Rotate fretboard - media query
Key dropdown
Ghost scale or chord patterns behind triad, seventh, pentatonic

kill major / minor

enharmonic = { flat: [ '' ], sharp: [ '' ] };
root{ flat: [ { label, note, sign } ], sharp: [ {}] }
choose root - 1 of 12 + flat sharp button

Diatonic
key -> (flat / sharp) ->
		mode / degree <-X-> 7 major scale >>>mod>>>  3 triad / 4 seventh / (if not o7) 5 pentatonic

Blues
key -> (flat / sharp) ->
	I IV V <-X-> triad, dom seventh, mixolydian, maj blues, min blues, Diad 3 & 7, compatible pentatonics


Vanilla / Diatonic Mode
Triad I - VII
Seventh Chords I - VII
Diatonic scale / modes I - VII
Pentatonic I - VI

Parallel Sixths - string pair chooser E A D - draw patterns ?

Blues Mode - major / minor
I / IV / V
X Triad
X Dominant 7th
X Mixolydian
Pentatonic
	X Major Pentatonic / Hexatonic
	X Minor Pentatonic / Hexatonic

	optional pentatonics I IV V
X Diad 3 & 7
			
