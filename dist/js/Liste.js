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
			this.all = this.filterRestaurant(min, max);

			this.emptyRestaurantsHTMLList();
			carte.clearMarkers();
			this.showAllRestaurants();
		});
	}

	emptyRestaurantsHTMLList() {
		document.getElementById('restaurants').innerHTML = '';
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
