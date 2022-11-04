const footnotes = (main, mobile) => {
	if (typeof main.id != "string" || main.id != "page") {
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

/*const justify = (main) => {
	// TODO: Comments without paragraphs don't have p elements.
	const elements = main.querySelectorAll(".content>p, .content>blockquote p, .content>ul li p, .content>ol li p, .welcomments__comment-message p");

	document.fonts.ready.then(() => {
		texLinebreak.texLinebreakDOM(elements, {
			hangingPunctuation:     false,
			ignoreFloatingElements: true,
		});
	});
}*/

const smallcaps = (main) => {
	const sentence = main.querySelector(".content>p");
	if (!sentence) {
		return;
	}
	console.log(sentence.innerHTML);

	let pattern = /^(.*?[^\w\d\s\'‘’“”\-\u00C0-\u024F\u1E00-\u1EFF<>/])/;
	if (sentence.innerHTML.match(pattern)[0].split(" ").length > 9) {
		pattern = /^([\S]+\s[\S]+\s[\S]+)/;
	}

	sentence.innerHTML = sentence.innerHTML.replace(pattern, "<span style=\"font-variant: small-caps;\">$1</span>");
}

const time = (header) => {
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

	now.innerHTML = `${format.find((e) => e.type == "day").value} ${format.find((e) => e.type == "month").value.replace(".", "").toUpperCase()}, ${format.find((e) => e.type == "year").value}`;
}

const scroll = (header, main, mobile) => {
	const input   = header.querySelector("#search input");
	const button  = header.querySelector("#search button");
	const arrow   = header.querySelector(".arrow");
	const results = header.querySelector(".results");
	const utility = header.querySelector(".utility");
	const right   = utility.querySelector(".right");

	const headerHeight = header.querySelector("#logo-container").clientHeight + 1;
	const heroHeight   = main.querySelector(".hero")?.getBoundingClientRect().bottom;

	let hidden     = false;
	let lastScroll = 0;
	let ticking    = false;

	const hide = (scroll) => {
		header.style.transform = `translateY(-${headerHeight}px)`;
		if (!mobile.matches) {
			utility.style.opacity = 1;
		}
		

		input.style.transform    = "rotateY(90deg)";
		button.style.transform   = "rotateY(0deg)";

		input.blur();

		results.innerHTML   = ""
		arrow.style.display = "none";

		hidden = true;
	}

	const show = (scroll) => {
		header.style.transform = "translateY(0px)";
		if (!mobile.matches) {
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
		}, 100);

		const scroll = window.scrollY;

		if (scroll < 40) {
			if (hidden) {
				show(scroll);
			}

			return;
		}

		if (!hidden && scroll > lastScroll + 12) {
			hide(scroll);
		} else if (hidden && scroll < lastScroll - 100) {
			show(scroll);
		}

		lastScroll = scroll;
	});
}

const search = (header, mobile) => {
	const logo             = header.querySelector("#logo");
	const input            = header.querySelector("#search input");
	const button           = header.querySelector("#search button");
	const resultsContainer = header.querySelector("#search .results-container");
	const arrow            = resultsContainer.querySelector(".arrow");
	const results          = resultsContainer.querySelector(".results");

	const minisearch = new MiniSearch({
		fields:      ["title", "subtitle", "authors", "content"],
		storeFields: ["title", "subtitle", "authors", "permalink"],
		processTerm: (term) => {
			return term.normalize('NFKD').replace(/[^\w]/g, '').toLowerCase();
		}
	});

	let fetched = false;

	button.addEventListener("click", (ev) => {
		ev.preventDefault();

		if (input.style.transform == "rotateY(90deg)") {
			if (!fetched) {
				fetch("/index.json")
					.then((response) => response.json())
					.then((data) => {
						minisearch.addAll(data);	
						fetched = true;
					});
			}

			if (mobile.matches) {
				logo.style.transform = "translateY(-200px)";
			}

			input.style.transform    = "rotateY(0deg)";
			button.style.transform   = "rotateY(180deg)";

			input.focus();

			input.dispatchEvent(new Event("input", {bubbles: true}));
		} else {
			input.style.transform    = "rotateY(90deg)";
			button.style.transform   = "rotateY(0deg)";

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

		const matches = minisearch.search(ev.target.value, {
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

const quote = (main) => {
	const intro = main.querySelector(".intro");
	if (!intro) {
		return;
	}

	const quotes = [
		["Ananda K. Coomaraswamy", "Mythe belichaamt de dichtstbijzijnde benadering van absolute waarheid die in woorden kan worden uitgedrukt."],
		["Carl Schmitt", "Wie mensheid zegt wil bedriegen."],
		["Charles Upton", "Het specifieke medicijn voor de schok van wanhoop is de diepere schok van betekenis."],
		["C. S. Lewis", "In de wetenschap hebben wij slechts de noten van een gedicht gelezen; in het christendom vinden wij het gedicht zelf."],
		["Friedrich Nietzsche", "De waanzin is bij de enkeling de uitzondering, maar onder groepen, partijen, volkeren eerder de regel."],
		["G. K. Chesterton", "Als God niet zou bestaan, zouden er geen atheïsten zijn."],
		["G. K. Chesterton", "Traditie betekent stemmen geven aan de meest obscure van alle klassen, onze voorouders."],
		["G. K. Chesterton", "De rede is zelf een kwestie van geloof. Het is een daad van geloof om te beweren dat onze gedachten ook maar iets met de werkelijkheid te maken hebben."],
		["G. K. Chesterton", "Tolerantie is de deugd van de man zonder overtuigingen."],
		["G. K. Chesterton", "Wanneer men verkiest niet in God te geloven, gelooft men daarna niet in niets, maar is men in staat in alles te geloven."],
		["René Guénon", "Ware ideeën veranderen of ontwikkelen zich niet, maar blijven zoals ze zijn in het tijdloze 'heden'."],
		["René Guénon", "Metafysica is de kennis van de universele beginselen, een kennis die verder gaat dan de natuur als zodanig en verder dan de verschijnselen die door de mens kunnen worden begrepen."],
		["René Guénon", "Wetenschap is een rationele, discursieve, altijd indirecte vorm van kennis, een kennis van reflectie, metafysica is een superrationele kennis, intuïtief en onmiddellijk."],
		["Friedrich Hölderlin", "De mens is een bedelaar wanneer hij denkt, maar een God wanneer hij droomt."],
		["Robert Lemm", "De reactionair, kijkt niet vooruit, en niet achteruit, maar naar boven, naar de sterren en de hemel."],
		["Julius Evola", "Mijn principes zijn de principes die, voor de Franse Revolutie, ieder welgeboren mens als normaal en gezond beschouwde."],
		["Julius Evola", "Geen idee is zo absurd als het idee van vooruitgang."],
		["Julius Evola", "Het is een teken van achteruitgang wanneer genot beschouwd begint te worden als het hoogste principe."],
		["Louis de Bonald", "De revolutie begon met de verklaring van de rechten van de mens: ze zal alleen eindigen met de verklaring van de rechten van God."],
		["Oswald Spengler", "Wat is waarheid? Voor de massa, dat wat zij voortdurend leest en hoort."],
		["Oswald Spengler", "Socialisme is niets anders dan het kapitalisme van de lagere klassen."],
		["Oswald Spengler", "Als de Engelsman het over nationale welvaart heeft, bedoelt hij het aantal miljonairs in het land."],
		["Patrick Deneen", "Vrij zijn betekende bovenal vrij zijn van slavernij aan de eigen laagste verlangens, die nooit vervuld zouden kunnen worden, en het nastreven ervan zou alleen maar onophoudelijk verlangen en ontevredenheid kunnen kweken."],
		["Patrick Deneen", "Wat conventioneel een populistische revolutie wordt genoemd, kan beter worden omschreven als een wereldwijde anti-technocratische revolutie."],
		["Theodore J. Kaczynski", "De conservatieven zijn dwazen: zij zeuren over de teloorgang van de traditionele waarden, maar toch steunen zij enthousiast de technologische vooruitgang en de economische groei."],
		["Theodore J. Kaczynski", "Geschiedenis wordt gevormd door actieve, vastberaden minderheden, niet door de meerderheid, die zelden een duidelijk en consequent idee heeft van wat zij werkelijk wil."],
		["Timothy Winter", "De liberale theorie van religie is homeopathisch; hoe meer je het afzwakt, hoe sterker het wordt."],
	];

	const quote = quotes[Math.floor(Math.random() * quotes.length)];

	intro.querySelector(".text").innerHTML   = `“${quote[1]}”`;
	intro.querySelector(".author").innerHTML = `<span class="dash">—</span> ${quote[0]}`;
}

window.addEventListener("DOMContentLoaded", (ev) => {
	const mobile = window.matchMedia("(max-width: 1024px)");

	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	quote(main);
	//justify(main);
	smallcaps(main)
	scroll(header, main, mobile);
	time(header);
	search(header, mobile);
	footnotes(main, mobile);
});
