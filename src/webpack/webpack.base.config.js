const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require("webpack");
const { join } = require("path");

const isDev = process.env.NODE_ENV !== "production";

const getCssLoaders = importLoaders => [
	"style-loader",
	{
		loader: "css-loader",
		options: {
			modules: false,
			sourceMap: isDev,
			importLoaders,
		},
	},
	{
		loader: "postcss-loader",
		options: {
			ident: "postcss",
			plugins: [
				require("postcss-flexbugs-fixes"),
				require("postcss-preset-env")({
					autoprefixer: {
						grid: true,
						flexbox: "no-2009",
					},
					stage: 3,
				}),
				require("postcss-normalize"),
			],
			sourceMap: isDev,
		},
	},
];

module.exports = {
	entry: isDev
		? ["webpack-hot-middleware/client?path=/public/__webpack_hmr", join(process.cwd(), "client")]
		: join(process.cwd(), "client"),
	output: {
		path: join(process.cwd(), "app/public"),
		publicPath: "/public/",
		chunkFilename: "[name].chunk.js",
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.(tsx?|js)$/,
				loader: "babel-loader",
				options: { cacheDirectory: true },
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: getCssLoaders(1),
			},
			{
				test: /\.less$/,
				use: [
					...getCssLoaders(2),
					{
						loader: "less-loader",
						options: {
							sourceMap: isDev,
						},
					},
				],
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10 * 1024,
							name: "[name].[contenthash:8].[ext]",
							outputPath: "assets/images",
						},
					},
				],
			},
			{
				test: /\.(ttf|woff|woff2|eot|otf)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "[name].[contenthash:8].[ext]",
							outputPath: "assets/fonts",
						},
					},
				],
			},
		],
	},
	plugins: [
		new HardSourceWebpackPlugin(),
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: join(process.cwd(), "app/view/index.html"),
			filename: "index.html",
			minify: isDev
				? false
				: {
						removeAttributeQuotes: true,
						collapseWhitespace: true,
						removeComments: true,
						collapseBooleanAttributes: true,
						collapseInlineTagWhitespace: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						minifyCSS: true,
						minifyJS: true,
						minifyURLs: true,
						useShortDoctype: true,
				  },
		}),
	],
};
