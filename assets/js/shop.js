import * as params from "@params";
import { overview, thanks, unavailable } from "./modules/shop/cart.js";
import { address, checkout } from "./modules/shop/checkout.js";
import { rating } from "./modules/shop/rating.js";
import { filter } from "./modules/shop/filter.js";
import { summary } from "./modules/shop/summary.js";
import { variant } from "./modules/shop/variant.js";

window.addEventListener("DOMContentLoaded", (ev) => {
	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	address(main);
	filter(main);
	summary(main);
	variant(main);
	unavailable(main);
	rating(main);
	thanks(header, main);
});
