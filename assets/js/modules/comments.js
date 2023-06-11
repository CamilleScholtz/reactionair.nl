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
			body: data
		});

		ev.target.reset();

		const comment     = document.createElement("div");
		comment.innerHTML = `
			<div class="comment">
				<div class="comment-info">
					<h3 class="comment-author">
						<span>${data.get("author")}</span>
					</h3>

					<p class="comment-time">
						<time>
							—&nbsp;nieuw
						</time>
					</p>
				</div>


				<div class="comment-body">${data.get("body")}</div>
			</div>
		`;

		main.querySelector("#comment-list").append(comment);
	});
}
