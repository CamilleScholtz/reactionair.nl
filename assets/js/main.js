import * as params from '@params';

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import mask from '@alpinejs/mask';
import collapse from '@alpinejs/collapse';
import anchor from '@alpinejs/anchor'
import focus from '@alpinejs/focus'

import wavesurfer from 'wavesurfer.js';
import currency from 'currency.js';

Alpine.plugin(persist);
Alpine.plugin(mask);
Alpine.plugin(collapse);
Alpine.plugin(anchor);
Alpine.plugin(focus);

document.addEventListener('alpine:init', async () => {
	Alpine.store('mobile', window.matchMedia('(max-width: 1024px)'));

	Alpine.store('wavesurfer', wavesurfer);

	Alpine.store('cart', {
		contents: Alpine.$persist([]).as('cart'),

		currency(value) {
			return currency(value, {
				symbol:    '€ ',
				decimal:   '.',
				separator: ' ',
			});
		},

		find(variant) {
			return this.contents.find((i) => i.variant === variant);
		},

		cache() {
			if (this.contents.length === 0) {
				return;
			}

			fetch(params.api + '/api/shop/shipping', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cart: this.contents,
				}),
			});
		},

		add(variant, price) {
			const current = this.find(variant);

			if (current) {
				current.quantity++;
			} else {
				this.contents.push({
					variant: variant,
					quantity: 1,
					price: currency(price),
				});
			}

			this.cache();
		},

		remove(variant) {
			const current = this.find(variant);

			if (current) {
				current.quantity--;
				if (current.quantity === 0) {
					this.contents = this.contents.filter((i) => i.variant !== variant);
				}
			}

			this.cache();
		},
	});
});

Alpine.start();
