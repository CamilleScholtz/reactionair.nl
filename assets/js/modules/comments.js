export const comments = (main) => {
	if (main.id !== "page") {
		return;
	}

	const form = main.querySelector("#comment-form");
	if (!form) {
		return;
	}

	form.addEventListener("submit", (ev) => {
		ev.preventDefault();

		const data = new FormData(ev.target);

		fetch(ev.target.action, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(Object.fromEntries(data))
		});

		ev.target.reset();

		const comment     = document.createElement("div");
		comment.innerHTML = `
			<div class="comment" itemprop="comment" itemscope itemtype="https://schema.org/Comment">
				<div class="comment-info">
					<h3 class="comment-author" itemprop="author" itemscope itemtype="https://schema.org/Person">
						<span itemprop="name">${data.get("author")}</span>
					</h3>

					<p class="comment-time">
						<time itemprop="datePublished">
							<span class="pipe">—</span>${(new Date()).toLocaleDateString('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
						</time>
					</p>
				</div>


				<div class="comment-body" itemprop="text">
					<small>
						(Reacties worden handmatig goedgekeurd, het kan enkele momenten duren voordat de opmerking zichtbaar is voor anderen.)<br>
					</small>

					${data.get("body")}
				</div>
			</div>
		`;

		main.querySelector("#comment-list").append(comment);
	});
}
