import MiniSearch from "../vendor/minisearch.js";

export const scroll = (header, main, mobile) => {
	const logo    = header.querySelector("#logo");
	const input   = header.querySelector("#search input");
	const button  = header.querySelector("#search button");
	const arrow   = header.querySelector(".arrow");
	const results = header.querySelector(".results");
	const utility = header.querySelector(".utility");
	const right   = utility.querySelector(".right");

	const headerHeight = header.querySelector("#logo-container").clientHeight + 1;

	let hidden     = false;
	let lastScroll = 0;
	let ticking    = false;

	const hide = (scroll) => {
		header.style.transform = `translateY(-${headerHeight}px)`;
		logo.style.transform   = "translateY(-32px)";
		if (!mobile.matches) {
			logo.style.opacity    = 0;
			utility.style.opacity = 1;
		}

		input.style.transform  = "rotateY(90deg)";
		button.style.transform = "rotateY(0deg)";

		input.blur();

		results.innerHTML   = ""
		arrow.style.display = "none";

		hidden = true;
	}

	const show = (scroll) => {
		header.style.transform = "translateY(0px)";
		logo.style.transform   = "translateY(0px)";
		if (!mobile.matches) {
			logo.style.opacity    = 1;
			utility.style.opacity = 0;
		}

		hidden = false;
	}

	window.addEventListener("scroll", () => {
		if (ticking) {
			return;
		}

		ticking = true;
		setTimeout(() => {
			ticking = false;
		}, 50);

		const scroll = window.scrollY;

		if (scroll < 40) {
			if (hidden) {
				show(scroll);
			}

			return;
		}

		if (!hidden && scroll > lastScroll + 6) {
			hide(scroll);
		} else if (hidden && scroll < lastScroll - 100) {
			show(scroll);
		}

		lastScroll = scroll;
	});
}

export const search = (header, mobile) => {
	const logo             = header.querySelector("#logo");
	const icons            = header.querySelectorAll(".icon");
	const input            = header.querySelector("#search input");
	const button           = header.querySelector("#search button");
	const resultsContainer = header.querySelector("#search .results-container");
	const arrow            = resultsContainer.querySelector(".arrow");
	const results          = resultsContainer.querySelector(".results");

	const mini = new MiniSearch({
		fields:      ["title", "subtitle", "authors", "content"],
		storeFields: ["title", "subtitle", "authors", "permalink"],
		processTerm: (term) => {
			return term.normalize('NFKD').replace(/[^\w]/g, '').toLowerCase();
		}
	});

	let fetched = false;

	button.addEventListener("click", (ev) => {
		ev.preventDefault();

		if (input.style.transform === "rotateY(90deg)") {
			if (!fetched) {
				const section = window.location.pathname.split("/")[1];

				fetch(section == "winkel" ? "/winkel/index.json" : "/index.json")
					.then((response) => response.json())
					.then((data) => {
						mini.addAll(data);
						fetched = true;
					});
			}

			if (mobile.matches) {
				logo.style.transform = "translateY(-200px)";
			}

			icons.forEach((icon) => {
				icon.style.opacity       = 0;
				icon.style.pointerEvents = "none";
			});

			setTimeout(() => {
				if (!mobile.matches) {
					input.style.width   = "calc(100% - 50px)";
					input.style.padding = "13px";
				}

				input.style.transform  = "rotateY(0deg)";
				button.style.transform = "rotateY(180deg)";
			}, 150);

			input.focus();

			input.dispatchEvent(new Event("input", {bubbles: true}));
		} else {
			icons.forEach((icon) => {
				icon.style.opacity       = 1;
				icon.style.pointerEvents = "auto";
			});

			if (!mobile.matches) {
				input.style.width   = "0px";
				input.style.padding = "0px";
			}

			input.style.transform  = "rotateY(90deg)";
			button.style.transform = "rotateY(0deg)";

			if (mobile.matches) {
				setTimeout(() => {
					logo.style.transform = "translateY(0px)";
				}, 200);
			}

			results.innerHTML   = ""
			arrow.style.display = "none";

			input.blur();
		}
	});

	input.addEventListener("input", (ev) => {
		results.innerHTML   = ""
		arrow.style.display = "none";

		const matches = mini.search(ev.target.value, {
			prefix: true,
			boost:  {title: 1.75, subtitle: 1.5},
		});

		if (matches.length < 1) {
			return;
		}

		arrow.style.display = "block";

		matches.forEach((match) => {
			const a = document.createElement("a");
			a.setAttribute("href", match.permalink);
			a.innerHTML = `
				<h2>${match.title}</h2>
				<h3>${match.subtitle}</h3>
				<p class="author">${match.authors.join(" & ")}</p>
			`;

			results.appendChild(a);
		});
	});
}

export const time = (header) => {
	const now = header.querySelector(".now");
	if (!now) {
		return;
	}

	const date   = new Date();
	const format = new Intl.DateTimeFormat("nl-NL", {
		day:   "numeric",
		month: "long",
		year:  "numeric",
	}).formatToParts(date);

	now.innerHTML = `${format.find((e) => e.type === "day").value} ${format.find((e) => e.type === "month").value.replace(".", "").toUpperCase()}, ${format.find((e) => e.type === "year").value}`;
}
