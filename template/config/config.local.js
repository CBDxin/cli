module.exports = appInfo => {
	const config = {};

	config.security = {
		csrf: {
			enable: false,
		},
		domainWhiteList: ["http://127.0.0.1:8080"],
	};
	config.cors = {
		origin: "http://127.0.0.1:8080",
		allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
	};

	return config;
};
