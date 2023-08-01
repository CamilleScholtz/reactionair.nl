import * as params from "@params";
import { edit, overview, thanks } from "./modules/shop/cart.js";
import { address, checkout } from "./modules/shop/checkout.js";
import { total } from "./modules/shop/header.js";

window.addEventListener("DOMContentLoaded", (ev) => {
	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

	total(header, cart);
	address(main);
	checkout(main);
	edit(main, header);
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
