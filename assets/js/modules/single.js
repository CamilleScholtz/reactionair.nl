import WaveSurfer from "../vendor/wavesurfer.js";

export const footnotes = (main, mobile) => {
	if (main.id !== "page") {
		return;
	}

	const article  = main.querySelector("article");
	const refs     = main.querySelectorAll(".footnote-ref");
	const backrefs = main.querySelectorAll(".footnote-backref");

	let timer;
	let ticking = false;

	refs.forEach((ref) => {
		const sup     = ref.parentNode;
		const id      = ref.getAttribute("href").split(":").pop();
		const backref = main.querySelector("#fn\\:" + id);

		ref.addEventListener("click", (ev) => {
			ev.preventDefault();

			window.scroll({
				top:      backref.offsetTop - 100,
				behavior: "smooth",
			});
		});

		sup.addEventListener("mouseenter", (ev) => {
			if (mobile.matches || ticking) {
				return;
			}

			ticking = true;

			timer = setTimeout(() => {
				const tooltip = document.createElement("div");
				const arrow   = document.createElement("div");

				tooltip.setAttribute("class", "tooltip");
				arrow.setAttribute("class", "arrow");

				tooltip.innerHTML = `
					<div class="hover"></div>
					${backref.innerHTML}
				`;
				tooltip.querySelector(".footnote-backref").remove();

				sup.appendChild(tooltip);
				sup.appendChild(arrow);

				const refCenter     = ref.offsetLeft + (ref.offsetWidth / 2);
				const tooltipCenter = tooltip.offsetWidth / 2;

				const left   = article.offsetLeft - 10;
				const center = refCenter - tooltipCenter;
				const right  = (article.offsetLeft + article.offsetWidth) - tooltip.offsetWidth + 10;

				let location = center;
				if (center > right) {
					location = right;
				} else if (center < left) {
					location = left;
				}

				tooltip.style.left = `${location}px`;
				arrow.style.left   = `${refCenter - 9}px`;

				setTimeout(() => {
					tooltip.style.transform = "translateY(4px)";
					tooltip.style.opacity   = 1;

					arrow.style.transform = "rotate(45deg) translateY(4px)";
					arrow.style.opacity   = 1;
				}, 20);
			}, 100);
		});

		sup.addEventListener("mouseleave", (ev) => {
			if (mobile.matches) {
				return;
			}

			clearTimeout(timer);

			const tooltip = sup.querySelector(".tooltip");
			const arrow   = sup.querySelector(".arrow");
			if (!tooltip && !arrow) {
				ticking = false;
				return;
			}

			arrow.style.transform = "rotate(45deg) translateY(-4px)";
			arrow.style.opacity   = 0;

			tooltip.style.transform = "translateY(-4px)";
			tooltip.style.opacity   = 0;

			setTimeout(() => {
				tooltip.remove();
				arrow.remove();

				ticking = false;
			}, 215);
		});
	});

	backrefs.forEach((backref) => {
		// XXX: https://github.com/gohugoio/hugo/pull/7427
		backref.innerHTML = "↑";

		const id  = backref.getAttribute("href").split(":").pop();
		const ref = main.querySelector("[href='#fn:" + id + "']");

		backref.addEventListener("click", (ev) => {
			ev.preventDefault();

			window.scroll({
				top:      ref.offsetTop - (window.innerHeight / 2),
				behavior: "smooth",
			});
		});
	});
}

export const recording = (main) => {
	if (main.id !== "page") {
		return;
	}

	const recording = main.querySelector(".recording");
	if (!recording) {
		return;
	}

	const play    	= recording.querySelector(".play");
	const pause 	= recording.querySelector(".pause");
	const style     = getComputedStyle(document.documentElement);

	const wavesurfer = WaveSurfer.create({
		container:     recording.querySelector(".player"),
		url:	       recording.dataset.src,
		waveColor:     style.getPropertyValue("--popup-border-color"),
		progressColor: style.getPropertyValue("--accent-color"),
		height:        50,
		barWidth:      20,
		cursorWidth:   0,
		dragToSeek:    true,
		peaks:         [JSON.parse(recording.dataset.waveform)['lines1'], JSON.parse(recording.dataset.waveform)['lines2']],
		renderFunction: (channels, ctx) => {
			const { width, offsetHeight } = ctx.canvas
			const scale             = channels[0].length / width
			const step              = 10

			ctx.lineWidth   = 5;
			ctx.strokeStyle = ctx.fillStyle
			ctx.translate(0, offsetHeight)
			ctx.beginPath()

			for (let i = ctx.lineWidth; i < width - ctx.lineWidth; i += step * 2) {
				const index = Math.floor(i * scale)
				const value = Math.abs(channels[0][index])

				let x = i
				let y = value * (offsetHeight - ctx.lineWidth)

				ctx.moveTo(x, 0)
				ctx.lineTo(x, y)
				ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true)
				ctx.lineTo(x + step, 0)

				x = x + step
				y = -y

				ctx.moveTo(x, 0)
				ctx.lineTo(x, y)
				ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false)
				ctx.lineTo(x + step, 0)
			}

			ctx.stroke()
			ctx.closePath()
		},
	});

	recording.querySelector(".play").addEventListener("click", (ev) => {
		wavesurfer.play()

		play.style.transform      = "rotateY(90deg)";
		pause.style.transform     = "rotateY(0deg)";
		play.style.pointerEvents  = "none";
		pause.style.pointerEvents = "auto";

		setTimeout(() => {
			pause.style.opacity = 1;
			play.style.opacity  = 0;
		}, 100);
	})

	recording.querySelector(".pause").addEventListener("click", (ev) => {
		wavesurfer.pause()

		play.style.transform      = "rotateY(0deg)";
		pause.style.transform     = "rotateY(90deg)";
		pause.style.pointerEvents = "none";
		play.style.pointerEvents  = "auto";

		setTimeout(() => {
			play.style.opacity  = 1;
			pause.style.opacity = 0;
		}, 100);
	})
}

