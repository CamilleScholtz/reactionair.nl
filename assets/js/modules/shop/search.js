import NiceSelect from "../../vendor/nice-select2.js";

export const search = (main) => {
	const select = main.querySelector("select");
	if (!select) {
		return;
	}

	select.value = window.location.pathname;

	new NiceSelect(select, {
		searchable:   true,
		placeholder:  "Selecteer auteur",
		searchtext:   "Zoek auteur",
		selectedtext: "Geselecteerd",
	});

	select.addEventListener("change", (ev) => {
		window.location = ev.target.value;
	});
}
