import axios from "axios";

export const AxiosJSON = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		Authorization: `Bearer ${localStorage.access_token}`,
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
