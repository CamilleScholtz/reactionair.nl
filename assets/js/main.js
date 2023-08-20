import { book } from "./modules/books.js";
import { comments } from "./modules/comments.js";
import { scroll, search, time } from "./modules/header.js";
import { quote, slider } from "./modules/home.js";
import { newsletter } from "./modules/newsletter.js";
import { footnotes, smallcaps } from "./modules/single.js";

window.addEventListener("DOMContentLoaded", (ev) => {
	const mobile = window.matchMedia("(max-width: 1024px)");

	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	quote(main);
	smallcaps(main)
	scroll(header, main, mobile);
	time(header);
	search(header, mobile);
	slider(mobile);
	footnotes(main, mobile);
	comments(main);
	newsletter(main);
	book(main, mobile)
});
