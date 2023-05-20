const edit = (main, header) => {
	const getProduct = (cart, dataset) => {
		return cart?.find(i => i.name === dataset.name) ?? {
			name:     dataset.name,
			quantity: 0,
			price:    parseFloat(dataset.price),
		};
	};

	const quantityChanged = (form, cart, product) => {
		const input  = form.querySelector(".added-to-cart");
		const button = form.querySelector(".add-to-cart");

		cart = cart.filter(i => i.name !== product.name);

		if (product.quantity > 0) {
			cart.push(product);

			input.style.display  = "inline-grid";
			button.style.display = "none";

			input.querySelector(".amount-in-cart").value = product.quantity;
		} else {
			input.style.display  = "none";
			button.style.display = "block";

			input.querySelector(".amount-in-cart").value = 0;
		}

		localStorage.setItem("cart", JSON.stringify(cart));

		total(header, cart);
		checkout(main, cart);
	};

	main.querySelectorAll(".cart-form").forEach((form) => {
		const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
		quantityChanged(form, cart, getProduct(cart, form.dataset));

		form.querySelectorAll(".add-to-cart").forEach((button) => {
			button.addEventListener("click", (ev) => {
				const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

				const product = getProduct(cart, form.dataset);
				product.quantity++;

				quantityChanged(form, cart, product);
			});
		});

		form.querySelectorAll(".remove-from-cart").forEach((button) => {
			button.addEventListener("click", (ev) => {
				const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

				const product    = getProduct(cart, form.dataset);
				product.quantity = product.quantity > 0 ? product.quantity - 1 : 0;

				quantityChanged(form, cart, product);
			});
		});

		form.querySelectorAll(".amount-in-cart").forEach((input) => {
			input.addEventListener("change", (ev) => {
				const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

				const product    = getProduct(cart, form.dataset);
				product.quantity = parseInt(input.value);

				quantityChanged(form, cart, product);
			});
		});
	});
}

const checkout = (main, cart) => {
	const checkout = main.querySelector(".checkout-page");
	if (checkout === null) {
		return;
	}

	checkout.querySelectorAll(".product").forEach((product) => {
		if (cart.find(i => i.name === product.dataset.name) === undefined) {
			product.style.display = "none";
		} else {
			product.style.display = "grid";
		}
	});

	var total = 0;
	cart.forEach((product) => {
		total += product.quantity * product.price;
	});

	checkout.querySelector(".total-price").innerHTML = new Intl.NumberFormat("nl-NL", {
		style:    "currency",
		currency: "EUR",
	}).format(total);
}

const total = (header, cart) => {
	var total = 0;
	cart?.forEach((product) => {
		total += product.quantity;
	});

	const element = header.querySelector("#total");

	if (total > 0) {
		element.innerHTML     = total;
		element.style.display = "flex";
	} else {
		element.innerHTML     = "";
		element.style.display = "none";
	}
}

window.addEventListener("DOMContentLoaded", (ev) => {
	const header = document.querySelector("header");
	const main   = document.querySelector("main");

	const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

	total(header, cart);
	edit(main, header);
	checkout(main, cart);
});
