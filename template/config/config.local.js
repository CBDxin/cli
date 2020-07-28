module.exports = appInfo => {
	const config = {};

	config.httpProxy = {
		"/public": {
			target: "http://127.0.0.1:8080",
		},
	};

	return config;
};
