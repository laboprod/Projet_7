class Restaurant {
	constructor({ restaurantName, lat, long, address, ratings }) {
		this.name = restaurantName;
		this.address = address;
		this.lat = lat;
		this.lng = long;
		this.ratings = ratings;
	}

	// addRestaurantToList() {
	// 	document.querySelectorAll('.accordion_button').forEach((button) => {
	// 		button.addEventListener('click', () => {
	// 			button.classList.toggle('accordion_button--active');
	// 		});
	// 	});
	// }
}

// export { Restaurant };
