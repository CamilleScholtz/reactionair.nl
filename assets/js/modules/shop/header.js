export const total = (header, cart) => {
	let total = 0;
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
