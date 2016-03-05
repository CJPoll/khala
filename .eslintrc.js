module.exports = {
	'rules': {
		'indent': [
			2,
			'tab'
		],
		'quotes': [
			2,
			'single'
		],
		'linebreak-style': [
			2,
			'unix'
		],
		'semi': [
			2,
			'always'
		],
		'require-jsdoc': [
			2,
			{
				'require': {
					'FunctionDeclaration': true,
					'MethodDefinition': true,
					'ClassDeclaration': false
				}
			}
		],
		'valid-jsdoc': [
			2,
			{
				'prefer': { 'return': 'return' }
			}
		],
		'global-require' : 2
	},
	'env': {
		'es6': true,
		'browser': true
	},
	'extends': 'eslint:recommended',
	'ecmaFeatures': {
		'jsx': true,
		'experimentalObjectRestSpread': true,
		'modules': true
	},
	'plugins': [
		'react'
	]
};
