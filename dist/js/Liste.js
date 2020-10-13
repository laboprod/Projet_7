class Liste {
	constructor() {
		this.all = [];
		this.filtered = [];
	}

	add(restaurant) {
		this.all.push(restaurant);
	}

	empty() {
		this.all = [];
	}

	emptyHTML() {
		document.getElementById('restaurants').innerHTML = '';
	}

	filterRestaurant(min, max) {
		return this.all.filter((restaurant) => {
			if (restaurant.averageRating >= min && restaurant.averageRating <= max) {
				return true;
			}
			return false;
		});
	}

	listenForFiltering() {
		document.getElementById('filter').addEventListener('click', () => {
			let min = $('#rating_min').val();
			let max = $('#rating_max').val();
			this.filtered = this.filterRestaurant(min, max);

			this.emptyHTML();
			carte.clearMarkers();
			this.showFilteredRestaurants();
		});
	}

	showFilteredRestaurants() {
		this.filtered.forEach((restaurant) => {
			restaurant.show();
		});
	}

	showJsonRestaurants() {
		this.all.forEach((restaurant) => {
			restaurant.show();
		});
	}
}
