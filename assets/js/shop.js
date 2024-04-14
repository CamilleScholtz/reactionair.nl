import { filter } from "./modules/shop/filter.js";

window.addEventListener("DOMContentLoaded", (ev) => {
	const main   = document.querySelector("main");

	filter(main);
});
