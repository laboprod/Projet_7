class Liste {
	constructor() {
		this.all = [];
	}

	add(restaurant) {
		this.all.push(restaurant);
	}

	// show() {
	// 	this.all.forEach((restaurant) => {
	// 		restaurant.show();
	// 	});
	// }

	listenForFiltering() {
		document.getElementById('filter').addEventListener('click', () => {
			let min = $('#rating_min').val();
			let max = $('#rating_max').val();
			this.filteredRestaurants = this.filterRestaurant(min, max);

			this.emptyRestaurantsList();
			carte.clearMarkers();
			this.showAllRestaurants(this.filteredRestaurants);
		});
	}

	emptyRestaurantsList() {
		document.getElementById('restaurants').innerHTML = '';
	}

	showAllRestaurants(restaurants) {
		restaurants.forEach((restaurant) => {
			restaurant.show();
		});
	}

	filterRestaurant(min, max) {
		return restaurants.filter((restaurant) => {
			if (restaurant.averageRating >= min && restaurant.averageRating <= max) {
				return true;
			}
			return false;
		});
	}
}
