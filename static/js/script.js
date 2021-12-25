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

const scroll = (header, asides, mobile) => {
	const logo    = header.querySelector("#logo img");
	const utility = header.querySelector(".utility");

	let hidden     = false;
	let lastScroll = 0;
	let scrolling  = false

	const hide = () => {
		if (mobile.matches) {
			header.style.transform = "translateY(calc(-111px - 15px))";
		} else {
			header.style.transform = "translateY(-111px)";
		}
		logo.style.transform = "translateY(-40px)";

		if (!mobile.matches) {
			asides.forEach((aside) => {
				if (aside.classList.contains("question")) {
					aside.style.top = "calc(110px + 55px + 50px + 2px - 111px)";
				} else {
					aside.style.top = "calc(110px + 55px + 40px + 2px - 111px)";
				}
			});
		}

		hidden = true;
	}

	const show = () => {
		header.style.transform = "translateY(0px)";
		logo.style.transform   = "translateY(0px)";

		if (!mobile.matches) {
			asides.forEach((aside) => {
				if (aside.classList.contains("question")) {
					aside.style.top = "calc(110px + 55px + 50px + 2px)";
				} else {
					aside.style.top = "calc(110px + 55px + 40px + 2px)";
				}
			});
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

const quote = () => {
	const aisde = document.querySelector("#quote");
	if (!aisde) {
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
		["Robert Lemm", "De <i>reactionair</i>, kijkt niet vooruit, en niet achteruit, maar naar boven, naar de sterren en de hemel."],
		["Julius Evola", "Mijn principes zijn de principes die, voor de Franse Revolutie, ieder welgeboren mens als normaal en gezond beschouwde."],
		["Julius Evola", "Geen idee is zo absurd als het idee van vooruitgang."],
		["Julius Evola", "Het is een teken van achteruitgang wanneer genot beschouwd begint te worden als het hoogste principe."],
		["Louis de Bonald", "De revolutie begon met de verklaring van de rechten van de mens: ze zal alleen eindigen met de verklaring van de rechten van God."],
		["Oswald Spengler", "Wat is waarheid? Voor de massa, dat wat zij voortdurend leest en hoort."],
		["Oswald Spengler", "Socialisme is niets anders dan het kapitalisme van de lagere klassen."],
		["Oswald Spengler", "Als de Engelsman het over nationale welvaart heeft, bedoelt hij het aantal miljonairs in het land."],
		["Theodore J. Kaczynski", "De conservatieven zijn dwazen: zij zeuren over de teloorgang van de traditionele waarden, maar toch steunen zij enthousiast de technologische vooruitgang en de economische groei."],
		["Theodore J. Kaczynski", "Geschiedenis wordt gevormd door actieve, vastberaden minderheden, niet door de meerderheid, die zelden een duidelijk en consequent idee heeft van wat zij werkelijk wil."],
		["Timothy Winter", "De liberale theorie van religie is homeopathisch; hoe meer je het afzwakt, hoe sterker het wordt."],
	];

	const quote = quotes[Math.floor(Math.random() * quotes.length)];

	aisde.querySelector("q").innerHTML       = quote[1];
	aisde.querySelector(".author").innerHTML = quote[0];
}


window.addEventListener("DOMContentLoaded", (ev) => {
	const mobile = window.matchMedia("(max-width: 1024px)");

	const header  = document.querySelector("header");
	const article = document.querySelector("article");
	const asides  = document.querySelectorAll("aside");

	scroll(header, asides, mobile);
	quote();
	time(header);
	footnotes(article);
});
