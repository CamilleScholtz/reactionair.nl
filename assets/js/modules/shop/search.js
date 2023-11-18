import NiceSelect from "../../vendor/nice-select2.js";

export const search = (main) => {
	const selects = main.querySelectorAll("select");
	if (!selects) {
		return;
	}

	selects.forEach((select) => {
		select.value = window.location.pathname;

		new NiceSelect(select, {
			searchable:   true,
			placeholder:  "Selecteer " + select.dataset.label,
			searchtext:   "Zoek " + select.dataset.label,
			selectedtext: "Geselecteerd",
		});

		select.addEventListener("change", (ev) => {
			window.location = ev.target.value;
		});
	});
}
