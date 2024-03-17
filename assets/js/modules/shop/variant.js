export const variant = (main) => {
	const variants = main.querySelector(".variants");
	if (!variants) {
		return;
	}

	const buttons = variants.querySelectorAll("a");
	const forms   = main.querySelectorAll(".cart-form");
	const details = main.querySelectorAll(".details td[data-variant]");

	buttons.forEach((button) => {
		button.addEventListener("click", (ev) => {
			ev.preventDefault();

			buttons.forEach((btn) => {
				btn.classList.remove("active");
			});
			button.classList.add("active");

			forms.forEach((form) => {
				if (form.dataset.variant === button.dataset.variant) {
					form.style.display = "grid";
				} else {
					form.style.display = "none";
				}
			});

			details.forEach((detail) => {
				if (detail.dataset.variant === button.dataset.variant) {
					detail.style.display = "revert";
				} else {
					detail.style.display = "none";
				}
			});
		});
	});
}
