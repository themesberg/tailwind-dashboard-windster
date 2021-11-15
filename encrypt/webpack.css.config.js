const path = require('path');
const fs = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { getLocalIdent } = require('./webpack.utils');

const generatedClassNames = {};


module.exports = {
	watch: false,
	mode: 'production',

	entry: {
		app: path.resolve(__dirname, '..', 'src/app.js')
	},
	output: {
		path: path.resolve(__dirname, '..', 'static/')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[hash:base64]',
								getLocalIdent: (context, localIdentName, localName, options) => {
									const regex = new RegExp('apexcharts|svgMap|tippy|fc-', 'g');
									if (regex.test(localName) === true || localName === 'fc') {
										return localName
									}

									const identName = getLocalIdent(context, localIdentName, localName, options);
									generatedClassNames[localName] = identName;

									fs.writeJSONSync("./classNames.json", generatedClassNames, {
										spaces: 0
									});

									return identName;
								}
							}
						}
					},
					'postcss-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css']
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	optimization: {
		minimizer: [
			new CssMinimizerPlugin()
		]
	}
};