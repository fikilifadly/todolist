import axios from "axios";

export const AxiosJSON = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		Authorization: `Bearer ${localStorage.access_token ? localStorage.access_token : localStorage.getItem("access_token")}`,
		"content-type": "application/json",
	},
});

export const showModalHandler = (id) => {
	if (id) {
		document.getElementById(id).showModal();
	} else {
		document.getElementById("mainmodal").showModal();
	}
};

export const removeModalHandler = () => {
	document.querySelector("dialog[open]").querySelector("form").submit();
};

export const dateFormat = (date) => {
	date = new Date(date);
	date = date.toISOString().split("T")[0];
	return date;
};

export const progressComplete = (data) => {
	let count = 0;
	for (const task of data) {
		if (task.progress == "complete") {
			count++;
		}
	}

	if (count > 0) {
		return (data / count) * 100;
	}

	return count;
};
