export const summary = (main) => {
	const more = main.querySelector(".more");
	if (!more) {
		return;
	}

	more.addEventListener("click", (ev) => {
		const hidden = main.querySelector(".content .hidden");

		hidden.style.display = "block";
		setTimeout(() => {
			hidden.style.opacity   = "1";
			hidden.style.transform = "scaleY(1)";
		}, 100);

		more.style.display   = "none";
	});
}
