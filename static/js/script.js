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

	const trans = {
		1:  "JAN",
		2:  "FEB",
		3:  "MRT",
		4:  "APR",
		5:  "MEI",
		6:  "JUN",
		7:  "JUL",
		8:  "AUG",
		9:  "SEP",
		10: "OKT",
		11: "NOV",
		12: "DEC",
	}
	const date  = new Date();
	const day   = date.getDate();
	const month = date.getMonth()+1;
	const year  = date.getFullYear();
	
	now.innerHTML = day + " " + trans[month] + ", " + year
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
			logo.style.transform   = "translateY(-40px)";

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

window.addEventListener("DOMContentLoaded", (ev) => {
	let mobile = window.matchMedia("(max-width: 1024px)").matches;

	const header  = document.querySelector("header");
	const sidebar = document.querySelector("#sidebar");
	const article = document.querySelector("article");
	const list    = document.querySelector("#list-container");

	scroll(header, sidebar, mobile);
	time(header);
	footnotes(article);
});
