export const rating = (main) => {
	if (main.id !== "page") {
		return;
	}

	const form = main.querySelector(".added-to-rating");
	if (!form) {
		return;
	}

	const amount = form.querySelector("#rating");
	const suffix = form.querySelector(".suffix");

	const updateAmount = () => {
		console.log(amount.value);
		amount.value     = Math.min(Math.max(parseInt(amount.value), 1), 5);
		suffix.innerHTML = amount.value <= 1 ? " ster" : " sterren";
	}

	form.querySelector(".add-to-rating").addEventListener("click", (ev) => {
		ev.preventDefault();

		amount.value = parseInt(amount.value) + 1;
		updateAmount();
	});

	form.querySelector(".remove-from-rating").addEventListener("click", (ev) => {
		ev.preventDefault();

		amount.value = parseInt(amount.value) -1;
		updateAmount();
	});

	amount.addEventListener("input", (ev) => {
		updateAmount();
	});
}
