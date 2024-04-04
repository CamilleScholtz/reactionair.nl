import * as params from "@params";
import currency from "../../vendor/currency.js";
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
		if (cart.find(i => i.variant === product.dataset.variant) === undefined) {
			product.style.display = "none";
		} else {
			product.style.display = "grid";
		}
	});

	const formatter = value => currency(value, { symbol: "€ ", separator: "." });

	let total = formatter(0);
	cart.forEach((variant) => {
		total = total.add(formatter(variant.price).multiply(variant.quantity));
	});

	page.querySelector(".total").innerHTML               = total.format();
	page.querySelector(".shipping").innerHTML            = formatter(shipping.price).format();
	page.querySelector(".free-shipping").innerHTML       = `(Verzendkosten, uiterlijk binnen ${shipping.estimation} werkdagen in huis)`
	page.querySelector(".total-plus-shipping").innerHTML = total.add(shipping.price).format()
}

export const edit = (main, header) => {
	const getVariant = (cart, dataset) => {
		return cart?.find(i => i.variant === dataset.variant) ?? {
			variant:  dataset.variant,
			quantity: 0,
			price:    currency(dataset.price),
		};
	}

	const quantityChanged = (form, cart, variant, shipping = true) => {
		const input  = form.querySelector(".added-to-cart");
		const button = form.querySelector(".add-to-cart");

		cart = cart.filter(i => i.variant !== variant.variant);

		if (variant.quantity > 0) {
			cart.push(variant);

			input.style.display  = "inline-grid";
			button.style.display = "none";

			input.querySelector(".amount-in-cart").value = variant.quantity;
		} else {
			input.style.display  = "none";
			button.style.display = "block";

			input.querySelector(".amount-in-cart").value = 0;
		}

		localStorage.setItem("cart", JSON.stringify(cart));

		total(header, cart);
		hideButtons(main, cart);

		if (shipping) {
			fetch(params.api+"/api/shop/shipping", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"cart": cart,
				})
			}).then((response) => {
				return response.json();
			}).then((data) => {
				return overview(main, cart, data);
			});
		}
	}

	const hideButtons = (main, cart) => {
		const forms = main.querySelectorAll("#products .cart-form.hidden");

		forms.forEach((form) => {
			if (cart.find(i => i.variant === form.dataset.variant) !== undefined) {
				form.style.display = "block";
			}
		});
	}

	main.querySelectorAll(".cart-form").forEach((form) => {
		if (form.querySelector(".unavailable") !== null) {
			return;
		}

		const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
		quantityChanged(form, cart, getVariant(cart, form.dataset), false);

		form.querySelectorAll(".add-to-cart").forEach((button) => {
			button.addEventListener("click", (ev) => {
				const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

				const variant = getVariant(cart, form.dataset);
				variant.quantity++;

				quantityChanged(form, cart, variant);
			});
		});

		form.querySelectorAll(".remove-from-cart").forEach((button) => {
			button.addEventListener("click", (ev) => {
				const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

				const variant    = getVariant(cart, form.dataset);
				variant.quantity = variant.quantity > 0 ? variant.quantity - 1 : 0;

				quantityChanged(form, cart, variant);
			});
		});

		form.querySelectorAll(".amount-in-cart").forEach((input) => {
			input.addEventListener("change", (ev) => {
				const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

				const variant    = getVariant(cart, form.dataset);
				variant.quantity = parseInt(input.value);

				quantityChanged(form, cart, variant);
			});
		});
	});
}

export const thanks = (header, main) => {
	const page = main.querySelector(".thank-you");
	if (page === null) {
		return;
	}

	localStorage.setItem("cart", JSON.stringify([]));
	total(header, []);
}

export const unavailable = (main) => {
	const form = main.querySelector(".unavailable-form");
	if (form === null) {
		return;
	}

	form.addEventListener("submit", (ev) => {
		ev.preventDefault();

		const data = new FormData(ev.target);

		const question = form.querySelector("#question");
		if (question.style.display == "none") {
			form.querySelector("#email").style.display = "none";
			question.style.display                     = "block";

			return;
		} else {
			if (data.get("question") != "8") {
				return;
			}
		}

		fetch(params.api+"/api/shop/reminder", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"variant": form.dataset.variant,
				"email": data.get("email"),
				"question": data.get("question"),
			})
		});

		ev.target.reset();

		form.innerHTML = "<p>Wanneer dit product weer op voorraad is, ontvangt u een e-mail.</p>";
	});
}
