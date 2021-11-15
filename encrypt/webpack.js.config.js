const { SourceMapDevToolPlugin, IgnorePlugin } = require("webpack");
const WebpackObfuscator = require("./WebpackObfuscatorPlugin");
const path = require('path');


module.exports = {
	watch: false,
	mode: 'production',

	entry: {
		app: path.resolve(__dirname, '..', 'temp', 'app.js')
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '..', '.build/'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules\/(?!.*flowbite)/,
				enforce: 'post',
				use: {
					loader: WebpackObfuscator.loader,
					options: {
						// Compressed code
						compact: true,
						// Whether to enable control flow flattening ( Reduce 1.5 Times the running speed )
						controlFlowFlattening: false,
						// Random dead code blocks ( Increased the size of obfuscated code )
						deadCodeInjection: false,
						// This option is almost impossible to use the console tab of the developer tool
						debugProtection: false,
						// If checked, , Will be in “ Console ” Use interval force debug mode on the tab , So it's harder to use “ Developer Tools ” Other functions of .
						debugProtectionInterval: false,
						// Disable... By replacing them with empty functions console.log,console.info,console.error and console.warn. This makes it more difficult to use the debugger .
						disableConsoleOutput: false,
						// The confusion of identifiers hexadecimal( Hexadecimal ) mangled( Short identifier )
						identifierNamesGenerator: 'hexadecimal',
						log: false,
						// Whether to enable confusion between global variable and function names
						renameGlobals: false,
						// Through fixed and random （ Generate when code is confused ） Move the array by its position . This makes it more difficult to match the order of deleted strings with their original positions . If the original source code is not small , This option is recommended , Because auxiliary functions can attract attention .
						rotateStringArray: true,
						// Confused code , You can't use code to beautify , At the same time, you need to configure compact:true;
						selfDefending: true,
						// Splits literal strings into chunks with length of splitStringsChunkLength option value (default: 10)
						splitStrings: true,
						// Delete string literals and put them in a special array
						stringArray: true,
						stringArrayThreshold: 0.75,
						// Allow to enable / Disable string conversion to unicode Escape sequences .Unicode Escape sequences greatly increase the code size , And you can easily restore the string to the original view . It is recommended to enable this option only for small source code .
						unicodeEscapeSequence: false
					}
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'static/images/'
				}
			},
			{
				test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{
					loader: 'file-loader'
				}]
			}
		]
	},
	resolve: {
		extensions: ['', '.jsx', '.js']
	},
	plugins: [
		new SourceMapDevToolPlugin({
			filename: "[file].map"
		}),
		new IgnorePlugin({
			resourceRegExp: /\.css$/
		})
	]
};