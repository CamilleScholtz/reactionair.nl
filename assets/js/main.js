import { comments } from "./modules/comments.js";
import { donate } from "./modules/donate.js";
import { menu, scroll, search } from "./modules/header.js";
import { slider } from "./modules/home.js";
import { newsletter } from "./modules/newsletter.js";
import { searchpage } from "./modules/search.js";
import { footnotes, recording } from "./modules/single.js";

window.addEventListener("DOMContentLoaded", (ev) => {
	const mobile = window.matchMedia("(max-width: 1024px)");

	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	scroll(header, mobile);
	menu(header, mobile);
	search(header);
	searchpage(main);
	slider(mobile);
	footnotes(main, mobile);
	comments(main);
	newsletter(main);
	donate(main);
	recording(main);
});
