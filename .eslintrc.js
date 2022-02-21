module.exports = {
	extends: [
		'react-app',
		'react-app/jest',
		'plugin:react-hooks/recommended',
	],
	rules: {
		'indent': [ 'error', 'tab', { 'SwitchCase': 1 } ],
		'arrow-parens': [ 'error', 'as-needed' ],
		'brace-style': [ 'error', '1tbs' ], // else stroustrup
		'comma-dangle': [ 'error', 'only-multiline' ],
		'linebreak-style': 'off', // git checks out LF as CRLF on windows

		'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true } ],
		'semi': [ 'error', 'always' ],
		'vars-on-top': 'error',

		// Spacing
		'array-bracket-spacing': [ 'error', 'always' ],
		'func-call-spacing': [ 'error', 'never' ], // no space before parentheses when a function is called
		'keyword-spacing': [ 'error', { 'before': true, 'after': true } ], // avoid `if(foo){`
		'key-spacing': [ 'error', { 'beforeColon': false, 'afterColon': true } ],
		'lines-between-class-members': [ 'warn', 'always' ],
		'no-multiple-empty-lines': [
			'error',
			{
				'max': 2,
				'maxBOF': 1,
				'maxEOF': 0 // actually allows one blank line at end of file
			}
		],
		'no-multi-spaces': [ 'error', { ignoreEOLComments: true } ],
		'object-curly-spacing': [ 'error', 'always' ],
		'padded-blocks': [ 'error', 'never' ], // blanklines padding inside blocks
		'padding-line-between-statements': [
			'error',

			// blankline before return (replaces newline-before-return)
			{ 'blankLine': 'always', 'prev': '*', 'next': 'return' },

			// blankline after one or more of [const, var, let] (allows multiline blocks of variables)
			{ 'blankLine': 'always', 'prev': [ 'const', 'let', 'var' ], 'next': '*' },
			{ 'blankLine': 'any', 'prev': [ 'const', 'let', 'var' ], 'next': [ 'const', 'let', 'var' ] },

			// blankline before if blocks
			{ 'blankLine': 'always', 'prev': [ '*' ], 'next': 'if' },

			// blankline after IIFE
			{ 'blankLine': 'always', 'prev': 'iife', 'next': '*' }
		],
		'space-before-blocks': 'error', // before block curly brace
		'space-before-function-paren': [ 'error', 'always' ],
		'space-infix-ops': [ 'error', { 'int32Hint': false } ],
		'space-unary-ops': [
			'error',
			{
				'words': true,    // new Foo  [new, delete, typeof, void, yield]
				'nonwords': false // bar++    [-, +, --, ++, !, !!]
			}
		],

		'eqeqeq': 'warn', // because == can very occasionally be useful (as long as you comment why)

		// React hooks
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	}
};
