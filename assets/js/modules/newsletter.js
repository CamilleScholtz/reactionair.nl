export const newsletter = (main) => {
	const newsletters = main.querySelectorAll(".newsletter-container");
	if (!newsletters) {
		return;
	}

	newsletters.forEach((newsletter) => {
		newsletter.querySelector("form").addEventListener("submit", (ev) => {
			ev.preventDefault();

			const data = new FormData(ev.target);

			fetch(ev.target.action, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: data
			});

			ev.target.reset();

			const envelope           = newsletter.querySelector(".cover");
			envelope.src             = envelope.dataset.send;
			envelope.style.transform = "translateY(-10px) scale(0.9)";

			const text     = newsletter.querySelector(".text p");
			text.innerHTML = "Wij sturen u een e-mail ter verificatie, zie uw inbox.";
		});
	});
}
