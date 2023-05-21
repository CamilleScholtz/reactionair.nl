export const book = (main, mobile) => {
	const books = main.querySelectorAll(".book.hover.animate");
	if (!books) {
		return;
	}

	books.forEach((book) => {
		book.classList.remove("animate");
		book.style.transition = "transform 8.5s ease-in-out";

		let hover = false;
		let i     = true;

		const move = () => {
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

		setTimeout(move, 100);
		interval = setInterval(move, 8500);

		book.addEventListener("mouseenter", (ev) => {
			hover = true;

			clearInterval(interval);

			book.style.transition = "transform 1.5s ease";
			if (mobile.matches) {
				book.style.transform = "rotateY(-160deg) rotateX(3deg) scale(1.05)";
			} else {
				book.style.transform = "rotateY(-160deg) rotateX(3deg) scale(1.125)";
			}
		});

		book.addEventListener("mouseleave", (ev) => {
			hover = false;

			if (mobile.matches) {
				book.style.transform = "rotateY(-20deg) rotateX(3deg) scale(0.9)";
			} else {
				book.style.transform = "rotateY(-20deg) rotateX(3deg)";
			}

			setTimeout(() => {
				if (hover) {
					return;
				}

				i  = true;

				book.style.transition = "transform 8.5s ease-in-out";

				setTimeout(move, 100);
				clearInterval(interval);
				interval = setInterval(move, 8500);
			}, 1500);
		});
	});
}
