class Carte {
	constructor(map, liste) {
		this.map = map;
		this.placeService = new google.maps.places.PlacesService(map);
		this.markers = [];
		this.liste = liste;
	}

	addMarker(type, pos, text) {
		let icon = 'img/restaurant-icon.png';

		if (type === 'user') {
			icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
		}

		let marker = new google.maps.Marker({
			position: { lat: pos.lat, lng: pos.lng },
			map: this.map,
			animation: google.maps.Animation.DROP,
			icon: icon,
		});

		if (text) {
			let infoWindow = new google.maps.InfoWindow();

			marker.addListener('click', () => {
				infoWindow.setContent(`<h2>${text}</h2>`);
				infoWindow.open(this.map, marker);
			});
		}

		this.markers.push(marker);
	}

	clearMarkers() {
		this.markers.forEach((marker) => {
			marker.setMap(null);
		});
		this.markers = [];
	}

	getUserPosition() {
		let self = this;
		return new Promise(function (resolve, reject) {
			let infoWindow = new google.maps.InfoWindow();

			if (!navigator.geolocation) {
				self.handleLocationError(false, infoWindow, map.getCenter());
				reject('an issue occured');
			}
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				() => {
					self.handleLocationError(true, infoWindow, map.getCenter());
				}
			);
		});
	}

	handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : "Error: Your browser doesn't support geolocation.");
		infoWindow.open(map);
	}

	listenForRightClick() {
		google.maps.event.addListener(map, 'rightclick', (e) => {
			let position = e.latLng;

			showModal('loading');
			map.setCenter(position);
			this.clearMarkers();
			this.liste.empty();
			this.liste.emptyHTML();
			this.fetchNearbyRestaurants(position)
				.then((results) => {
					this.display(results);
				})
				.then(() => {
					hideModal('loading');
				});
		});
	}

	fetchNearbyRestaurants(position) {
		let request = {
			location: position,
			radius: 5000,
			types: ['restaurant'],
		};

		let self = this;

		return new Promise(function (resolve, reject) {
			self.placeService.nearbySearch(request, function (results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					resolve(results);
				} else {
					reject('an error occured');
				}
			});
		});
	}

	display(results) {
		let self = this;

		return new Promise(function (resolve, reject) {
			results.forEach((result) => {
				let item = {
					restaurantName: result.name,
					address: result.vicinity,
					lat: result.geometry.location.lat(),
					long: result.geometry.location.lng(),
					ratings: [],
					placeId: result.place_id,
				};

				let restaurant = new Restaurant(item, self);

				restaurant.fetchReviews().then(() => {
					self.liste.all.push(restaurant);
					restaurant.show();
				});
			});

			resolve();
		});
	}

	createMarker(place) {
		let infoWindow = new google.maps.InfoWindow();
		let placeLoc = place.geometry.location;
		let marker = new google.maps.Marker({
			map: map,
			position: placeLoc,
			icon: 'img/restaurant-icon.png',
		});

		marker.addListener('click', () => {
			infoWindow.setContent(place.name);
			infoWindow.open(map, marker);
		});
		return marker;
	}
}
