const footnotes = (article) => {
	if (!article) {
		return;
	}

	const refs     = article.querySelectorAll(".footnote-ref");
	const backrefs = article.querySelectorAll(".footnote-backref");

	refs.forEach((ref) => {
		ref.addEventListener("click", (ev) => {
			ev.preventDefault();

			const id = ref.getAttribute("href").split(":").pop();
			const to = article.querySelector("#fn\\:" + id).offsetTop - 100;

			// TODO: This is not smooth in Safari.
			window.scroll({
				top:      to,
				behavior: "smooth",
			});
		});
	});

	backrefs.forEach((backref) => {	
		// XXX: https://github.com/gohugoio/hugo/pull/7427
		backref.innerHTML = "↑";
	
		backref.addEventListener("click", (ev) => {
			ev.preventDefault();

			const id = backref.getAttribute("href").split(":").pop();
			const to = article.querySelector("[href='#fn:" + id + "']").offsetTop - (window.innerHeight / 2)

			// TODO: This is not smooth in Safari.
			window.scroll({
				top:      to,
				behavior: "smooth",
			});
		});
	});
}

const time = (header) => {
	const now = header.querySelector(".now");
	if (!now) {
		return;
	}

	const date  = new Date();
	const year  = new Intl.DateTimeFormat("nl-NL", {year: "numeric"}).format(date);
	const month = new Intl.DateTimeFormat("nl-NL", {month: "short"}).format(date);
	const day   = new Intl.DateTimeFormat("nl-NL", {day: "2-digit"}).format(date);
	
	now.innerHTML = `${day} ${month.slice(0, -1).toUpperCase()}, ${year}`;
}

const scroll = (header, author, question, media) => {
	const logo    = header.querySelector("#logo img");
	const utility = header.querySelector(".utility");

	let hidden     = false;
	let lastScroll = 0;
	let scrolling  = false

	const hide = () => {
		if (media.matches) {
			header.style.transform = "translateY(calc(-111px - 15px))";
		} else {
			header.style.transform = "translateY(-111px)";
		}
		logo.style.transform = "translateY(-40px)";

		if (author && !media.matches) {
			author.style.top   = "calc(110px + 55px + 40px + 2px - 111px)";
			question.style.top = "calc(110px + 55px + 50px + 2px - 111px)";
		}

		hidden = true;
	}

	const show = () => {
		header.style.transform = "translateY(0px)";
		logo.style.transform   = "translateY(0px)";

		if (author && !media.matches) {
			author.style.top   = "calc(110px + 55px + 40px + 2px)";
			question.style.top = "calc(110px + 55px + 50px + 2px)";
		}

		hidden = false;
	}

	window.addEventListener("scroll", () => {
		scrolling = true;
	});

	setInterval(() => {
		if (!scrolling) {
			return;
		}

		const scroll = window.scrollY;

		if (scroll < 300) {
			if (hidden) {
				show();
			}

			return;
		}

		if (!hidden && scroll > lastScroll + 4) {
			hide();
		} else if (hidden && scroll < lastScroll - 50) {
			show();
		}

		lastScroll = scroll;
	}, 200);
}


window.addEventListener("DOMContentLoaded", (ev) => {
	let media = window.matchMedia("(max-width: 1024px)");

	const header   = document.querySelector("header");
	const author   = document.querySelector("#author");
	const question = document.querySelector("#question");
	const article  = document.querySelector("article");

	scroll(header, author, question, media);
	time(header);
	footnotes(article);
});
