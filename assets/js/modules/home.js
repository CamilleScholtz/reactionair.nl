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
