# React Fretboard

This is currently in development.  For outstanding issues please read TODO.md.

## Prerequisites
* Ensure Node.js is installed.

## Getting started
* `npm i` to install
* `npm start` to run in a browser at: http://localhost:3000

## To use
Ensure the tuning matches your guitar, by default it is set to Spanish tuning, i.e. E A D G B E.  Tuning options are available in the Settings section (open it using the button in the top right hand corner).

1. Select the root note of the key you wish to play in.
2. Select the scale or chord notes you want to see on the fretboard.

### Examples
#### Chords in the key of G major
* Select `Diatonic` mode and choose `G` as the root note
* Select `Triad` to see 3 note triad chords
* Select `Note` to see each of these 3 notes as notes from the `G` major scale, or `Interval` to see each note as an interval that the triad contains
* For a chord progression such as `G`, `D`, `Em`, `C` choose the degrees: `I`, `V`, `VI`, and `IV`
* Notice that instead of the triads you can choose to see a `Pentatonic` scale for each of these degrees

#### Blues in A
* Select `Blues` mode and choose `A` as the root note
* Select `Dominant 7` to see the 4 notes of an A seventh dominant V chord
* Select `I`, `IV`, and `V` to see dominant seventh chords in a blues chord progression (A7, D7, E7)
* Select `Major Blues` or `Minor Blues` to see those scales over each of these 3 chords

<hr />

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
