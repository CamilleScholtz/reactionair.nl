import * as params from "@params";

export const address = (main) => {
	const page = main.querySelector(".checkout-page");
	if (page === null) {
		return;
	}

	page.querySelectorAll("[name='postal-code'], [name='house-number']").forEach((field) => {
		field.addEventListener("change", (ev) => {
			const postalCode  = page.querySelector("[name='postal-code']").value;
			const houseNumber = page.querySelector("[name='house-number']").value;

			if (!(postalCode.length === 6 || postalCode.length === 7) || houseNumber.length === 0) {
				return;
			}

			fetch(params.api+"/api/shop/address", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"postal-code":  postalCode,
					"house-number": houseNumber
				})
			}).then((response) => {
				return response.json();
			}).then((data) => {
				if (data.message) {
					switch (data.message) {
						case "No result for this combination.":
							return page.querySelector(".error").innerHTML = "De ingevulde postcode en huisnummer combinatie is niet gevonden.";
						default:
							return page.querySelector(".error").innerHTML = "Er is een fout opgetreden.";
					}
				}

				page.querySelector("[name='street']").value = data.street;
				page.querySelector("[name='city']").value   = data.city;
			});
		});
	});
}

export const checkout = (main) => {
	const page = main.querySelector(".checkout-page");
	if (page === null) {
		return;
	}

	page.querySelector("form").addEventListener("submit", (ev) => {
		ev.preventDefault();

		const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

		fetch(params.api+"/api/shop/payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"cart": cart,
				"form": Object.fromEntries(new FormData(ev.target)),
			})
		}).then((response) => {
			return response.json();
		}).then((data) => {
			window.location.replace(data);
		});
	});
}
