import { edit, overview } from "./modules/shop/cart.js";
import { address, checkout } from "./modules/shop/checkout.js";
import { total } from "./modules/shop/header.js";

window.addEventListener("DOMContentLoaded", (ev) => {
	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

	total(header, cart);
	edit(main, header);
	overview(main, cart);
	address(main);
	checkout(main);
});
