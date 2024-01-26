import * as params from "@params";

export const donate = (main) => {
	const page = main.querySelector(".donate-page");
	if (page === null) {
		return;
	}

	page.querySelector("form").addEventListener("submit", (ev) => {
		ev.preventDefault();

		fetch(params.api+"/api/donate/payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(Object.fromEntries(new FormData(ev.target)))
		}).then((response) => {
			return response.json();
		}).then((data) => {
			window.location.replace(data);
		});
	});
}
