class Restaurant {
	constructor({ restaurantName, lat, long, address, ratings }, carte) {
		this.name = restaurantName;
		this.address = address;
		this.lat = lat;
		this.lng = long;
		this.ratings = ratings;
		this.carte = carte;
		this.id = String(lat) + String(long);
	}

	showOnMap() {
		this.carte.addMarker({
			coords: {
				lat: this.lat,
				lng: this.lng,
			},
			iconImage: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
			content: `<h1>${this.name}</h1>`,
		});
	}

	showDetails() {
		$('.accordion').append(`<button type="button" class="accordion_button" id="${this.id}">${this.name}<button>`);
		$('.accordion_content').append(`<div class="accordion_content">${this.address}<div>`);
		document.getElementById(this.id).addEventListener('click', function () {
			this.classList.toggle('accordion_button--active');
		});
	}
}

// export { Restaurant };
