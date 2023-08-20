export const footnotes = (main, mobile) => {
	if (main.id !== "page") {
		return;
	}

	const article  = main.querySelector("article");
	const refs     = main.querySelectorAll(".footnote-ref");
	const backrefs = main.querySelectorAll(".footnote-backref");

	let timer;
	let ticking = false;

	refs.forEach((ref) => {
		const sup     = ref.parentNode;
		const id      = ref.getAttribute("href").split(":").pop();
		const backref = main.querySelector("#fn\\:" + id);

		ref.addEventListener("click", (ev) => {
			ev.preventDefault();

			window.scroll({
				top:      backref.offsetTop - 100,
				behavior: "smooth",
			});
		});

		sup.addEventListener("mouseenter", (ev) => {
			if (mobile.matches || ticking) {
				return;
			}

			ticking = true;

			timer = setTimeout(() => {
				const tooltip = document.createElement("div");
				const arrow   = document.createElement("div");

				tooltip.setAttribute("class", "tooltip");
				arrow.setAttribute("class", "arrow");

				tooltip.innerHTML = `
					<div class="hover"></div>
					${backref.innerHTML}
				`;
				tooltip.querySelector(".footnote-backref").remove();

				sup.appendChild(tooltip);
				sup.appendChild(arrow);

				const refCenter     = ref.offsetLeft + (ref.offsetWidth / 2);
				const tooltipCenter = tooltip.offsetWidth / 2;

				const left   = article.offsetLeft - 10;
				const center = refCenter - tooltipCenter;
				const right  = (article.offsetLeft + article.offsetWidth) - tooltip.offsetWidth + 10;

				let location = center;
				if (center > right) {
					location = right;
				} else if (center < left) {
					location = left;
				}

				tooltip.style.left = `${location}px`;
				arrow.style.left   = `${refCenter - 9}px`;

				setTimeout(() => {
					tooltip.style.transform = "translateY(4px)";
					tooltip.style.opacity   = 1;

					arrow.style.transform = "rotate(45deg) translateY(4px)";
					arrow.style.opacity   = 1;
				}, 20);
			}, 100);
		});

		sup.addEventListener("mouseleave", (ev) => {
			if (mobile.matches) {
				return;
			}

			clearTimeout(timer);

			const tooltip = sup.querySelector(".tooltip");
			const arrow   = sup.querySelector(".arrow");
			if (!tooltip && !arrow) {
				ticking = false;
				return;
			}

			arrow.style.transform = "rotate(45deg) translateY(-4px)";
			arrow.style.opacity   = 0;

			tooltip.style.transform = "translateY(-4px)";
			tooltip.style.opacity   = 0;

			setTimeout(() => {
				tooltip.remove();
				arrow.remove();

				ticking = false;
			}, 215);
		});
	});

	backrefs.forEach((backref) => {
		// XXX: https://github.com/gohugoio/hugo/pull/7427
		backref.innerHTML = "↑";

		const id  = backref.getAttribute("href").split(":").pop();
		const ref = main.querySelector("[href='#fn:" + id + "']");

		backref.addEventListener("click", (ev) => {
			ev.preventDefault();

			window.scroll({
				top:      ref.offsetTop - (window.innerHeight / 2),
				behavior: "smooth",
			});
		});
	});
}

export const smallcaps = (main) => {
	if (main.id !== "page") {
		return;
	}

	const sentence = main.querySelector(".content>p:first-of-type");
	if (!sentence) {
		return;
	}

	let pattern = /^(.*?[^\w\d\s\'‘’“”\-\u00C0-\u024F\u1E00-\u1EFF<>/])/;
	if (sentence.innerHTML.match(pattern)[0].split(" ").length > 9) {
		pattern = /^([\S]+\s[\S]+\s[\S]+)/;
	}

	sentence.innerHTML = sentence.innerHTML.replace(pattern, "<span style=\"font-family: 'IM Fell English SC', serif;\">$1</span>");
}
