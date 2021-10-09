const eta = (sidebar, article) => {
	if (!sidebar) {
		return;
	}

	const eta = sidebar.querySelector("#eta");

	const words = article.innerText.split(" ").length;
	const time  = Math.ceil(words / 225)

	sidebar.querySelector("#eta").innerText = time + " minuten leestijd";
}

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

const scroll = (header, sidebar, mobile) => {
	const logo    = header.querySelector("#logo img");
	const utility = header.querySelector(".utility");

	let hidden     = false;
	let lastScroll = 0;
	let scrolling  = false

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
				header.style.transform = "translateY(0px)";
				logo.style.transform   = "translateY(0px)";

				if (sidebar && !mobile) {
					sidebar.style.transform = "translateY(0px)";
				}

				hidden = true;
			}
		
			return;
		}
	
		if (!hidden && scroll > lastScroll + 4) {
			header.style.transform = "translateY(-111px)";
			logo.style.transform   = "translateY(-20px)";

			if (utility && mobile) {
				utility.style.paddingTop = "10px";
			}

			if (sidebar && !mobile) {
				sidebar.style.transform = "translateY(-111px)";
			}

			hidden = true;
		} else if (hidden && scroll < lastScroll - 50) {
			header.style.transform = "translateY(0px)";
			logo.style.transform   = "translateY(0px)";

			if (utility && mobile) {
				utility.style.paddingTop = "25px";
			}

			if (sidebar && !mobile) {
				sidebar.style.transform = "translateY(0px)";
			}
			
			hidden = false;
		}

		lastScroll = scroll;
	}, 200);
}

const search = (header, mobile) => {
	const logo   = header.querySelector("#logo img");
	const form   = header.querySelector("#search");
	const button = form.querySelector("#search button");
	const input  = form.querySelector("#search input");

	let visible = false;

	form.addEventListener("submit", (ev) => {
		ev.preventDefault();

		window.location.href = "/zoeken/?q=" + input.value;
	});

	button.addEventListener("click", (ev) => {
		if (visible || !mobile) {
			return true;
		}

		ev.preventDefault();

		logo.style.transform      = "translateX(calc(-50vw + 80px))";
		input.style.opacity       = 1;
		input.style.pointerEvents = "text";
		button.style.background   = "#FFF";

		input.focus();

		visible = true;
	});
}

window.addEventListener("DOMContentLoaded", (ev) => {
	let mobile = window.matchMedia("(max-width: 1024px)").matches;

	const header  = document.querySelector("header");
	const sidebar = document.querySelector("#sidebar");
	const article = document.querySelector("article");

	eta(sidebar, article);
	scroll(header, sidebar, mobile);
	footnotes(article);
	search(header, mobile);
});
