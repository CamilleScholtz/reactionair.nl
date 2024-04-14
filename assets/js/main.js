import { donate } from "./modules/donate.js";
import { menu, scroll, search } from "./modules/header.js";
import { searchpage } from "./modules/search.js";
import { footnotes } from "./modules/single.js";

window.addEventListener("DOMContentLoaded", (ev) => {
	const mobile = window.matchMedia("(max-width: 1024px)");

	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	scroll(header, mobile);
	menu(header, mobile);
	search(header);
	searchpage(main);
	footnotes(main, mobile);
	donate(main);
});
