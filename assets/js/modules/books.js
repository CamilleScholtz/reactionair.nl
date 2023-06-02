export const book = (main, mobile) => {
	const books = main.querySelectorAll(".book.hover.animate, .book.click");
	if (!books) {
		return;
	}

	books.forEach((book) => {
		const animated  = book.classList?.contains("animate");
		const clickable = book.classList?.contains("click");

		let hover = false;
		let click = false;
		let i     = true;

		let interval;

		const animate = () => {
			if (i) {
				if (mobile.matches) {
					book.style.transform = "rotateY(-30deg) rotateX(3deg) scale(0.9)";
				} else {
					book.style.transform = "rotateY(-30deg) rotateX(3deg)";
				}
			} else {
				if (mobile.matches) {
					book.style.transform = "rotateY(-20deg) rotateX(3deg) scale(0.9)";
				} else {
					book.style.transform = "rotateY(-20deg) rotateX(3deg)";
				}
			};

			i = !i;
		}

		if (animated) {
			book.classList.remove("animate");
			book.style.transition = "transform 8.5s ease-in-out";

			setTimeout(animate, 100);
			interval = setInterval(animate, 8500);

			book.addEventListener("mouseenter", (ev) => {
				hover = true;

				if (clickable && click) {
					return;
				}

				clearInterval(interval);

				book.style.transition = "transform 1.5s ease";
				if (mobile.matches) {
					book.style.transform = "rotateY(-40deg) rotateX(3deg) scale(1)";
				} else {
					book.style.transform = "rotateY(-40deg) rotateX(3deg) scale(1.08)";
				}
			});

			book.addEventListener("mouseleave", (ev) => {
				hover = false;

				if (clickable && click) {
					return;
				}

				if (mobile.matches) {
					book.style.transform = "rotateY(-20deg) rotateX(3deg) scale(0.9)";
				} else {
					book.style.transform = "rotateY(-20deg) rotateX(3deg)";
				}

				setTimeout(() => {
					if (hover) {
						return;
					}

					i = true;

					book.style.transition = "transform 8.5s ease-in-out";

					setTimeout(animate, 100);
					clearInterval(interval);
					interval = setInterval(animate, 8500);
				}, 1500);
			});
		}

		if (clickable) {
			book.addEventListener("click", (ev) => {
				click = !click;

				book.style.transition = "transform 1.5s ease";

				if (click) {
					if (mobile.matches) {
						book.style.transform = "rotateY(-160deg) rotateX(3deg) scale(1.05)";
					} else {
						book.style.transform = "rotateY(-160deg) rotateX(3deg) scale(1.125)";
					}
				} else {
					if (mobile.matches) {
						book.style.transform = "rotateY(-20deg) rotateX(3deg) scale(0.9)";
					} else {
						book.style.transform = "rotateY(-20deg) rotateX(3deg)";
					}

					if (animated) {
						setTimeout(() => {
							if (hover) {
								return;
							}

							i = true;

							book.style.transition = "transform 8.5s ease-in-out";

							setTimeout(animate, 100);
							clearInterval(interval);
							interval = setInterval(animate, 8500);
						}, 1500);
					}
				}
			});
		}
	});
}
