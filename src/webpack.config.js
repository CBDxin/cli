"use strict";

const { join } = require("path");

module.exports = {
	// entry: resolve(__dirname, "./entry.js"),
	entry: join(process.cwd(), "client"),
	output: {
		path: join(process.cwd(), "dist"),
		publicPath: "/dist/",
		filename: "bundle.js",
	},
};
