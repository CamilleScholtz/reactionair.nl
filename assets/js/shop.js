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
	thanks(header, main);

	fetch(params.api+"/api/shop/shipping", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	}).then((response) => {
		return response.json();
	}).then((data) => {
		edit(main, header, data);
		overview(main, cart, data);
	});
});
