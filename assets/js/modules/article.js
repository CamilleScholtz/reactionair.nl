export const article = (main, mobile) => {
	if (mobile.matches) {
		return;
	}

	const articles = document.querySelectorAll(".article");
	if (!articles) {
		return;
	}

	articles.forEach((article) => {
		let rect   = null;
		let factor = null;

		const animationTarget = {
			x: 0,
			y: 0,
			scale: 1000,
			shouldAnimate: false,
		};

		const currentState = {
			x: 0,
			y: 0,
			scale: 1000,
			isAnimating: false,
		};

		const goTowardsValue = (current, to) => {
			return Math.round((current + (to - current) * 0.15) * 100) / 100
		};

		const animate = () => {
			currentState.x     = goTowardsValue(currentState.x, animationTarget.x);
			currentState.y     = goTowardsValue(currentState.y, animationTarget.y);
			currentState.scale = goTowardsValue(currentState.scale, animationTarget.scale);

			if (
				Math.abs(animationTarget.x - currentState.x) < 0.015 &&
				Math.abs(animationTarget.y - currentState.y) < 0.015 &&
				Math.abs(animationTarget.scale - currentState.scale) < 0.015 &&
				!animationTarget.shouldAnimate
			) {
				currentState.isAnimating = false;
				return;
			}

			article.style.transform = `translateZ(-20px) perspective(700px) scale(${currentState.scale / 1000}) rotateX(${Math.round(currentState.x * 100) / 100}deg) rotateY(${Math.round(currentState.y * 100) / 100}deg)`;

			window.requestAnimationFrame(animate);
		};

		article.addEventListener("mousemove", (ev) => {
			if (!animationTarget.shouldAnimate) {
				rect   = article.getBoundingClientRect();
				factor = 700 / ((rect.width + rect.height) / 2);
			}
			animationTarget.shouldAnimate = true

			animationTarget.x     = ((ev.clientY - rect.top - rect.height / 2) / rect.height) * 2 * factor;
			animationTarget.y     = -((ev.clientX - rect.left - rect.width / 2) / rect.width) * 3 * factor;
			animationTarget.scale = 1000 + factor * 10;

			if (!currentState.isAnimating) {
				currentState.isAnimating      = true;
				animationTarget.shouldAnimate = true;

				window.requestAnimationFrame(animate);
			}
		});

		article.addEventListener("mouseleave", () => {
		    animationTarget.x             = 0
		    animationTarget.y             = 0
		    animationTarget.scale         = 1000
		    animationTarget.shouldAnimate = false
		});
	});
}
