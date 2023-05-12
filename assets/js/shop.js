const cart = (main, header) => {
	main.querySelectorAll(".add-to-cart").forEach((button) => {
		button.addEventListener("click", (ev) => {
			const cart    = JSON.parse(localStorage.getItem("cart")) || [];
			const product = {
				name:    button.dataset.name,
				price:   button.dataset.price,
				quality: 1,
			};

			const productInCart = cart.filter((product) => {
				return product.name === button.dataset.name;
			});

			if (productInCart.length === 0) {
				cart.push(product);
			} else {
				cart.forEach((product) => {
					if (product.name === button.dataset.name) {
						product.quality++;
					}
				});
			}

			localStorage.setItem("cart", JSON.stringify(cart));

			button.innerHTML = "+ Voeg toe aan winkelmandje";

			quality(header);
		});
	});
}

const quality = (header) => {
	const cart = JSON.parse(localStorage.getItem("cart"));
	if (!cart) {
		return;
	}

	var quality = 0;
	cart.forEach((product) => {
		quality += product.quality;
	});

	if (quality > 0) {
		header.querySelector("#quality").innerHTML = quality;
	}
}

window.addEventListener("DOMContentLoaded", (ev) => {
	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	quality(header);
	cart(main, header);
});
