export default {
	printWidth: 120,
	tabWidth: 2,
	useTabs: false,
	semi: false,
	singleQuote: true,
	quoteProps: 'consistent',
	jsxSingleQuote: true,
	trailingComma: 'none',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	proseWrap: 'preserve',
	htmlWhitespaceSensitivity: 'css',
	embeddedLanguageFormatting: 'off',
	plugins: ['prettier-plugin-svelte'],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	]
};
