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

	listenForFiltering() {
		document.getElementById('filter').addEventListener('click', () => {
			let min = $('#rating_min').val();
			let max = $('#rating_max').val();
			this.filtered = this.filterRestaurant(min, max);

			this.emptyRestaurantsHTMLList();
			carte.clearMarkers();
			this.showFilteredRestaurants();
		});
	}

	emptyRestaurantsHTMLList() {
		document.getElementById('restaurants').innerHTML = '';
	}

	showFilteredRestaurants() {
		this.filtered.forEach((restaurant) => {
			restaurant.show();
		});
	}

	showAllRestaurants() {
		this.all.forEach((restaurant) => {
			restaurant.show();
		});
	}

	filterRestaurant(min, max) {
		return this.all.filter((restaurant) => {
			if (restaurant.averageRating >= min && restaurant.averageRating <= max) {
				return true;
			}
			return false;
		});
	}
}
