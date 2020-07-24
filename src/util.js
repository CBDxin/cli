import fs from "fs";

export let isExist = async name => {
	if (fs.existsSync(name)) {
		return true;
	} else {
		return false;
	}
};
