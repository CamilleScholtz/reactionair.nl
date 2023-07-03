import { total } from "./header.js";

export const overview = (main, cart, shipping) => {
	const page = main.querySelector(".cart-page");
	if (page === null) {
		return;
	}

	if (cart.length === 0) {
		page.querySelector(".cart-empty").style.display = "block";
		page.querySelector(".info").style.display       = "none";
	} else {
		page.querySelector(".cart-empty").style.display = "none";
		page.querySelector(".info").style.display       = "block";
	}

	page.querySelectorAll(".product").forEach((product) => {
		if (cart.find(i => i.name === product.dataset.name) === undefined) {
			product.style.display = "none";
		} else {
			product.style.display = "grid";
		}
	});

	let total = 0;
	cart.forEach((product) => {
		total += product.quantity * product.price;
	});

	const formatter = new Intl.NumberFormat("nl-NL", {
		style:    "currency",
		currency: "EUR",
	});

	page.querySelector(".shipping").innerHTML            = formatter.format(total < shipping.threshold ? shipping.price : 0);
	page.querySelector(".free-shipping").innerHTML       = total < shipping.threshold ? `(Nog <span>${formatter.format(shipping.threshold - total)}</span> voor gratis verzending)` : "(Gratis verzending)";
	page.querySelector(".total").innerHTML               = formatter.format(total);
	page.querySelector(".total-plus-shipping").innerHTML = formatter.format(total + (total < shipping.threshold ? shipping.price : 0));
}

export const edit = (main, header, shipping) => {
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
		overview(main, cart, shipping);
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
