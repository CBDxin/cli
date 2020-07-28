"use strict";

const { join } = require("path");
// const webpack = require("webpack");

const isDev = process.env.NODE_ENV !== "production";

// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
// 	// entry: resolve(__dirname, "./entry.js"),
// 	entry: ["webpack-hot-middleware/client?path=/statics/__webpack_hmr", join(process.cwd(), "client")],
// 	output: {
// 		path: join(process.cwd(), "app/public"),
// 		publicPath:"/statics/",
// 		chunkFilename: '[name].chunk.js',
// 		filename: "bundle.js",
// 	},
// 	plugins: [
// 		new webpack.HotModuleReplacementPlugin(),
// 		new HtmlWebpackPlugin({
// 			template: join(process.cwd(), "app/view/index.html"),
// 		}),
// 	],
// };

module.exports = require(join(
	__dirname,
	`/webpack/webpack.${isDev ? "dev" : "prod"}.config.js`
));
