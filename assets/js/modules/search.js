import MiniSearch from "../vendor/minisearch.js";

export const searchpage = (main, mobile) => {
	const search = main.querySelector("#search-block");
	if (!search) {
		return;
	}
	const input            = search.querySelector("input");
	const button           = search.querySelector(".button");
	const resultsContainer = search.querySelector(".results-container");
	const results          = resultsContainer.querySelector(".results");

	const mini = new MiniSearch({
		fields:      ["title", "subtitle", "authors", "content"],
		storeFields: ["title", "subtitle", "authors", "permalink"],
		processTerm: (term) => {
			return term.normalize('NFKD').replace(/[^\w]/g, '').toLowerCase();
		}
	});

	fetch("/index.json")
		.then((response) => response.json())
		.then((data) => {
			mini.addAll(data);
		});

	button.addEventListener("click", (ev) => {
		ev.preventDefault();
	});

	input.addEventListener("input", (ev) => {
		results.innerHTML = ""

		const matches = mini.search(ev.target.value, {
			prefix: true,
			boost:  {title: 1.75, subtitle: 1.5},
		});

		if (matches.length < 1) {
			return;
		}

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
