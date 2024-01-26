import * as params from "@params";
import { edit, overview, reset, thanks, unavailable } from "./modules/shop/cart.js";
import { address, checkout } from "./modules/shop/checkout.js";
import { total } from "./modules/shop/header.js";
import { search } from "./modules/shop/search.js";

window.addEventListener("DOMContentLoaded", (ev) => {
	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

	reset(cart);
	total(header, cart);
	address(main);
	checkout(main);
	edit(main, header);
	search(main);
	unavailable(main);
	thanks(header, main);

	fetch(params.api+"/api/shop/shipping", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"cart": cart,
		})
	}).then((response) => {
		return response.json();
	}).then((data) => {
		return overview(main, cart, data);
	});
});
