export const quote = (main) => {
	if (main.id !== "home") {
		return;
	}

	const intro = main.querySelector(".intro");

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

export const slider = (mobile) => {
	if (!mobile.matches) {
		return;
	}

	const scroll = document.querySelector(".left .scroll");
	if (!scroll) {
		return;
	}

	let height = 0;
	scroll.querySelectorAll("h2").forEach((el) => {
		if (el.offsetHeight > height) {
			height = el.offsetHeight;
		}
	});

	scroll.querySelectorAll("h2").forEach((el) => {
		el.style.height = `${height}px`;
	});
}
